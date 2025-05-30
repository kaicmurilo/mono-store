"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const telegraf_1 = require("telegraf");
const dotenv_1 = __importDefault(require("dotenv"));
const Product_1 = require("./models/Product");
dotenv_1.default.config();
const bot = new telegraf_1.Telegraf(process.env.TELEGRAM_TOKEN);
exports.bot = bot;
const ADMIN_IDS = [123456789]; // substitua pelo seu chat_id real
const isAuthorized = (id) => ADMIN_IDS.includes(id);
console.log('[BOT] Telegraf iniciado');
// Mensagem ao iniciar o bot (enviado para o admin)
bot.launch().then(() => {
    bot.telegram.sendMessage(ADMIN_IDS[0], '🤖 Bot da loja iniciado com Telegraf!');
});
// Comando /start
bot.start((ctx) => {
    const id = ctx.chat.id;
    console.log(`[BOT] /start de ${id}`);
    if (!isAuthorized(id)) {
        return ctx.reply('⛔ Acesso negado.');
    }
    ctx.reply('✅ Bem-vindo! Use /cadastrar ou /relatorio.');
});
// Comando /cadastrar
bot.command('cadastrar', async (ctx) => {
    const id = ctx.chat.id;
    const text = ctx.message.text;
    if (!isAuthorized(id)) {
        return ctx.reply('⛔ Acesso negado.');
    }
    const input = text.replace('/cadastrar ', '').split(',');
    if (input.length < 3) {
        return ctx.reply('⚠️ Use: /cadastrar nome,preço,imagem_url');
    }
    const [name, price, imageUrl] = input;
    const product = new Product_1.Product({ name, price: parseFloat(price), imageUrl });
    await product.save();
    ctx.reply(`✅ Produto cadastrado: ${name} - R$ ${price}`);
});
// Comando /relatorio
bot.command('relatorio', async (ctx) => {
    const id = ctx.chat.id;
    if (!isAuthorized(id)) {
        return ctx.reply('⛔ Acesso negado.');
    }
    const products = await Product_1.Product.find();
    if (!products.length)
        return ctx.reply('📦 Nenhum produto cadastrado.');
    const report = products.map((p) => `📦 ${p.name} - R$ ${p.price}`).join('\n');
    ctx.reply(`🧾 Produtos:\n${report}`);
});
// Catch global de erro
bot.catch((err, ctx) => {
    console.error('[BOT] Erro:', err);
    ctx.reply('❌ Ocorreu um erro ao processar sua solicitação.');
});
