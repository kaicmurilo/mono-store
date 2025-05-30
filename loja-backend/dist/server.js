"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongo_1 = require("./config/mongo");
const telegraf_1 = require("telegraf");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3001;
(0, mongo_1.connectMongo)().then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
bot.launch();
bot.start((ctx) => {
    const id = ctx.chat.id;
    console.log(`[BOT] /start de ${id}`);
    ctx.reply('✅ Bem-vindo! Use /cadastrar ou /relatorio.');
});
bot.command('oi', async (ctx) => {
    const id = ctx.chat.id;
    console.log(`[BOT] /start de ${id}`);
});
