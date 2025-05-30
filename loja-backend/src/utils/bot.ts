import { Telegraf } from 'telegraf'

import { Product } from '../models/Product'
import { config } from '../config'



const bot = new Telegraf(config.telegramToken as string)
const ADMIN_IDS = [config.adminId as string]
const CHAT_ID = config.chatId as string

const isAuthorized = (id: string) =>
  ADMIN_IDS.includes(id) || CHAT_ID.toString() === id.toString()

bot.use(async (ctx, next) => {
  const id = ctx.chat?.id?.toString()
  if (!id || !isAuthorized(id)) {
    await ctx.reply('⛔ Acesso negado.')
    return
  }
  await next()
})

// Mensagem ao iniciar o bot (enviado para o admin)
bot.launch().then(() => {
  bot.telegram.sendMessage(ADMIN_IDS[0], '🤖 Bot da loja iniciado com Telegraf!')
})

// Comando /start
bot.start((ctx) => {
  const name = ctx.from?.first_name || 'usuário'
  ctx.reply(`✅ Bem-vindo, ${name}! Use /cadastrar ou /relatorio.`)
})

// Comando /cadastrar
bot.command('cadastrar', async (ctx) => {
  const text = ctx.message.text

  const input = text.replace('/cadastrar ', '').split(',')

  if (input.length < 3) {
    return ctx.reply('⚠️ Use: /cadastrar nome,preço,imagem_url')
  }

  const [name, price, imageUrl] = input
  const product = new Product({ name, price: parseFloat(price), imageUrl })
  await product.save()

  ctx.reply(`✅ Produto cadastrado: ${name} - R$ ${price}`)
})

// Comando /estoque
bot.command('estoque', async (ctx) => {
  const products = await Product.find()
  if (!products.length) return ctx.reply('📦 Nenhum produto cadastrado.')

  const report = products.map((p) => `📦 ${p.name} - R$ ${p.price}`).join('\n')
  ctx.reply(`🧾 Produtos:\n${report}`)
})

// Comando /vendas
bot.command('vendas', async (ctx) => {
  const products = await Product.find()
  if (!products.length) return ctx.reply('📦 Nenhuma venda registrada.')

  const report = products.map((p) => `📦 ${p.name} - R$ ${p.price}`).join('\n')
  ctx.reply(`🧾 Vendas:\n${report}`)
})

// Catch global de erro
bot.catch((err, ctx) => {
  console.error('[BOT] Erro:', err)
  ctx.reply('❌ Ocorreu um erro ao processar sua solicitação.')
})

export { bot }
