
const axios = require('axios');
// const url = process.env.TELEGRAM_URL;
const apiToken = '1258688959:AAG7e2fzKTMdItZlM2bI8Ueao_5U-jHjnvg';
const url = process.env.URL
const witToken = 'EWFUCEOSLPMAIVANMSYQE5IJ45LSQIMM'
const witClient = require('../wit/witClient');
const telegram = require('node-telegram-bot-api');  
const service = require('../../server');





const bot = new telegram(apiToken);

bot.setWebHook(`${url}/bot${apiToken}`);


const serviceRegistry = service.get('serviceRegistry');
const registry = serviceRegistry;



module.exports=new class requestController {
    

    echo(msg , match){
        console.log('ok1')
    
        const chatId= msg.chat.id;
        const resp = match[1];

        bot.sendMessage(chatId , resp);
    }


    index2(req, res) {
        bot.processUpdate(req.body);
        res.sendStatus(200);
    }

   

    message(msg){

        if(msg.text.toLowerCase().includes('gbot')){    
            witClient.ask(witToken , msg.text , (err , res)=>{
                if(err){
                    console.log(err);
                    return;
                }

                try {
                    if(!res.intent || !res.intent[0] || !res.intent[0].value ){
                        throw new Error('Could not extract intent.')
                    }

                    const intent = require(`../intents/${res.intent[0].value}Intent`);
                    console.log(res.intent)

                    intent.process(res , registry , function(error , response){
                        if(error) return console.log(error.message)
                        return bot .sendMessage(msg.chat.id , response)
                    })
                } catch (err) {
                    console.log(err);
                    console.log(res);
                    bot.sendMessage(msg.chat.id , "Sorry I don't know what you are talking about.")
                }
                

                // if(!res.intent){
                //     return bot.sendMessage(msg.chat.id , "Sorry I don't know what you are talking about. " )
                // }else if(res.intent[0].value == 'time' && res.location){
                //     return bot.sendMessage(msg.chat.id , `I don't yet know time in ${res.location[0].value}` )
                // }else{
                //     console.log(res);
                //     return bot.sendMessage(msg.chat.id , "Sorry I don't know what you are talking about. " )
                // }
                // bot.sendMessage(msg.chat.id, 'Sorry did not undrestand!');

            });
        } 
    }

    getbot(){
        return bot
    }
}



