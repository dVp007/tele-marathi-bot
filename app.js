require('dotenv').config();

// suvichar dependencies
const fs = require('fs');
const csv = require('csv-parser');

// dinvishesh dependencies
const dinvishesh = require('dinvishesh');

// telebot dependencies
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const bot = new TelegramBot(token,{
    polling : true
})

var suvichar = []
fs.createReadStream('./csvFiles/suvichar.csv')
    .pipe(csv())
    .on('data',(row)=>{
        suvichar.push(row);
    })
    
bot.onText(/\/start/,(msg,match)=>{
    const chatId = msg.chat.id;
    console.log(msg.chat);
    bot.sendMessage(
        chatId,
        'Hello '+msg.chat.first_name+"!",
    )
})

bot.onText(/\/quotes/,(msg,match) => {
    const chatId = msg.chat.id;
    let random = Math.floor(Math.random() * (365 - 1)) + 1;
    console.log(suvichar[random].Suvichar);
    bot.sendMessage(
        chatId,
        suvichar[random].Suvichar
    );  
});

bot.onText(/\/news/,(msg,match) => {
    const chatId = msg.chat.id;
    let news = 'https://www.lokmat.com/latestnews/page/4/'
    bot.sendMessage(
        chatId,
        news
    )
})


bot.onText(/\/on_this_day/,(msg,match)=>{
    const chatId = msg.chat.id;
    bot.sendMessage(
        chatId,
        'Tumhala kai avashakta aahe?',{
            reply_markup: {
                inline_keyboard: [[
                    {
                        text: 'Janam',
                        callback_data: '/janam'
                    }, {
                        text: 'Mrutyu',
                        callback_data: '/mrutyu'
                    }, {
                        text: 'Ghatana',
                        callback_data: '/ghatana'
                    }
                ]]
            }
        }
    )
})

bot.on('callback_query', (callbackQuery) => {
    const message = callbackQuery.message;
    const category = callbackQuery.data;
    dinvisheshObj = dinvishesh.dinVisheshToday()
    let reply = '';
    switch (category){
        case '/janam':
            reply = dinvisheshObj.janm;
            break;
        case '/mrutyu':
            reply = dinvisheshObj.mrutyu;
            break;
        case '/ghatana':
            reply = dinvisheshObj.ghatana;
            break;
    }
    console.log(reply)
    bot.sendMessage(
        message.chat.id, 
        reply.join('\n')
    )
 });

bot.on('polling_error',(err)=>{
    console.log(err);
})