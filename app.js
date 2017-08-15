var five = require("johnny-five");
var Raspi = require("raspi-io");
var fs = require("fs");
var board = new five.Board({
  io: new Raspi()
});
var exec = require('child_process').exec;

var alarma = 0; // 1 ACTIVA  // 0 DESACTIVA
var usuarios = [USER_NUMBER_ONE,USER_NUMBER_TWO];










const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = 'YOUR TELEGRAM TOKEN';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


bot.onText(/\/foto/, (msg) => {

  const chatId = msg.chat.id;
  //console.log("CHAT" + chatId);
  foto(chatId);

});


bot.onText(/\/start/, (msg) => {

bot.sendMessage(msg.chat.id, "Opciones", {
"reply_markup": {
    "keyboard": [["Alarma"], ["Foto"], ["Video"]]
    }
});

});


bot.onText(/\Alarma/, (msg) => {

bot.sendMessage(msg.chat.id, "Alarma que desea hacer?", {
"reply_markup": {
  inline_keyboard: [
    [
      {
        text: 'ON',
         // we shall check for this value when we listen
         // for "callback_query"
        callback_data: 'alarma_on'
      },
      {
        text: 'OFF',
         // we shall check for this value when we listen
         // for "callback_query"
        callback_data: 'alarma_off'
      },
    ]
  ]
    }
});

});


bot.onText(/\Foto/, (msg) => {

bot.sendMessage(msg.chat.id, "Selecciona calidad imagen", {
"reply_markup": {
  inline_keyboard: [
    [
      {
        text: 'LOW',
         // we shall check for this value when we listen
         // for "callback_query"
        callback_data: 'foto_low'
      },
      {
        text: 'MEDIUM',
         // we shall check for this value when we listen
         // for "callback_query"
        callback_data: 'foto_medium'
      },
      {
        text: 'HIGH',
         // we shall check for this value when we listen
         // for "callback_query"
        callback_data: 'foto_high'
      },
    ]
  ]
    }
});

});

bot.onText(/\Video/, (msg) => {

bot.sendMessage(msg.chat.id, "Selecciona Tiempo del video", {
"reply_markup": {
  inline_keyboard: [
    [
      {
        text: '5 Sec',
         // we shall check for this value when we listen
         // for "callback_query"
        callback_data: 'video_5'
      },
      {
        text: '10 Sec',
         // we shall check for this value when we listen
         // for "callback_query"
        callback_data: 'video_10'
      },
      {
        text: '15 Sec',
         // we shall check for this value when we listen
         // for "callback_query"
        callback_data: 'video_15'
      },
    ]
  ]
    }
});

});

/*
bot.on('text', (msg) => {
console.log(msg.chat.id);
});
*/


bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;
  var user_valid = usuarios.indexOf(msg.chat.id,);
  if(user_valid >= 0) {

    switch (action) {
      case 'alarma_on':
        alarma = 1;
        //bot.sendMessage(msg.chat.id, "Alarma Activada");
        textos_all("AlarmaON");
        break;
      case 'alarma_off':
        alarma = 0;
        //bot.sendMessage(msg.chat.id, "Alarma Desactivada");
        textos_all("AlarmaOFF");
        break;
      case 'foto_low':
        foto(msg.chat.id, "LOW");
        break;
      case 'foto_medium':
        foto(msg.chat.id, "MEDIUM");
        break;
      case 'foto_high':
        foto(msg.chat.id, "HIGH");
        break;
      case 'video_5':
        video(msg.chat.id, 5);
        break;
      case 'video_10':
        video(msg.chat.id, 10);
        break;
      case 'video_15':
        video(msg.chat.id, 15);
        break;
      default:

    }

  } else {
      bot.sendMessage(msg.chat.id, "No tienes privilegios");
  }

  //bot.editMessageText(text, opts);
});




function foto(chatId, quality) {


   const execSync = require('child_process').execSync;
   switch (quality) {
     case "LOW":
        code = execSync('raspistill -w 640 -h 480 -t 500 -q 100 -n -o photo.jpg | echo photo.jpg');
       break;
     case "MEDIUM":
        code = execSync('raspistill -w 1024 -h 768 -t 500 -q 100 -n -o photo.jpg | echo photo.jpg');
       break;
     case "HIGH":
        code = execSync('raspistill -t 500 -q 100 -n -o photo.jpg | echo photo.jpg');
       break;
     default:

   }
   //code = execSync('raspistill -w 640 -h 480 -t 500 -q 100 -n -o photo.jpg | echo photo.jpg');
   //console.log("CODE"+code);
   const stream = fs.createReadStream("photo.jpg");
   bot.sendPhoto(chatId, stream);

}


function fotos(quality) {


   const execSync = require('child_process').execSync;
   switch (quality) {
     case "LOW":
        code = execSync('raspistill -w 640 -h 480 -t 500 -q 100 -n -o photo.jpg | echo photo.jpg');
       break;
     case "MEDIUM":
        code = execSync('raspistill -w 1024 -h 768 -t 500 -q 100 -n -o photo.jpg | echo photo.jpg');
       break;
     case "HIGH":
        code = execSync('raspistill -t 500 -q 100 -n -o photo.jpg | echo photo.jpg');
       break;
     default:

   }
   //code = execSync('raspistill -w 640 -h 480 -t 500 -q 100 -n -o photo.jpg | echo photo.jpg');
   //console.log("CODE"+code);
   const stream = fs.createReadStream("photo.jpg");
   for (var x in usuarios){
     bot.sendPhoto(usuarios[x], stream);
    }

}

function video(chatId, quality) {


   const execSync = require('child_process').execSync;
   switch (quality) {
     case 5:
        code = execSync('rm video.mp4; raspivid -t 5000 -w 640 -h 480 -fps 25 -b 1200000 -p 0,0,640,480 -o video.h264 && MP4Box -add video.h264 video.mp4 | echo video converted');
        //code2 = execSync('MP4Box -add video.h264 video.mp4 | echo video converted');

       break;
     case 10:
       code = execSync('rm video.mp4; raspivid -t 10000 -w 640 -h 480 -fps 25 -b 1200000 -p 0,0,640,480 -o video.h264 && MP4Box -add video.h264 video.mp4 | echo video converted');
       break;
     case 15:
       code = execSync('rm video.mp4; raspivid -t 15000 -w 640 -h 480 -fps 25 -b 1200000 -p 0,0,640,480 -o video.h264 && MP4Box -add video.h264 video.mp4 | echo video converted');
       break;
     default:

   }


   //code = execSync('raspistill -w 640 -h 480 -t 500 -q 100 -n -o photo.jpg | echo photo.jpg');
   //console.log("CODE"+code);
   const stream = fs.createReadStream("video.mp4");
   bot.sendVideo(chatId, stream);


}



function videos(quality) {


   const execSync = require('child_process').execSync;
   switch (quality) {
     case 5:
      code = execSync('rm video.mp4; raspivid -t 5000 -w 640 -h 480 -fps 25 -b 1200000 -p 0,0,640,480 -o video.h264 && MP4Box -add video.h264 video.mp4 | echo video converted');
       break;
     case 10:
       code = execSync('rm video.mp4; raspivid -t 10000 -w 640 -h 480 -fps 25 -b 1200000 -p 0,0,640,480 -o video.h264 && MP4Box -add video.h264 video.mp4 | echo video converted');
       break;
     case 15:
       code = execSync('rm video.mp4; raspivid -t 15000 -w 640 -h 480 -fps 25 -b 1200000 -p 0,0,640,480 -o video.h264 && MP4Box -add video.h264 video.mp4 | echo video converted');
       break;
     default:

   }
   //code = execSync('raspistill -w 640 -h 480 -t 500 -q 100 -n -o photo.jpg | echo photo.jpg');
   //console.log("CODE"+code);
   const stream = fs.createReadStream("video.mp4");
   for (var x in usuarios){
     bot.sendVideo(usuarios[x], stream);
    }


}




function textos_all(texto) {
  var textsend = "";
  switch (texto) {
    case "Presencia":
          textsend = "Se ha detectado una presencia";
      break;
    case "AlarmaON":
          textsend = "Se ha activado la Alarma";
      break;
    case "AlarmaOFF":
          textsend = "Se ha desactivado la Alarma";
      break;
    default:

  }
  for (var x in usuarios){
    bot.sendMessage(usuarios[x], textsend);
  }
}

board.on("ready", function() {

  // Create a new `motion` hardware instance.
  var motion = new five.Motion("P1-11");

  // "calibrated" occurs once, at the beginning of a session,
  motion.on("calibrated", function() {
    console.log("calibrated");
  });

  // "motionstart" events are fired when the "calibrated"
  // proximal area is disrupted, generally by some form of movement
  motion.on("motionstart", function() {

    if(alarma === 1) {
            textos_all("Presencia");
            fotos("MEDIUM");
            videos(5);
        }

  });

  // "motionend" events are fired following a "motionstart" event
  // when no movement has occurred in X ms
  motion.on("motionend", function() {
    //console.log("motionend");
  });

});
