var share=require('../lib/share.js');
var channelAccessToken=(process.env.LINE_CHANNEL_ID_SEACRET);
var request = require('request');

exports.reply=function(replyToken,text){
　　var url = 'https://api.line.me/v2/bot/message/reply';
  var headers = {
  　　'Content-Type' : 'application/json; charset=UTF-8',
 　　 'Authorization':'Bearer '+ channelAccessToken
  };

  var message={
    "type": "text",
    "text": text
  };
  var data={
    "replyToken":replyToken,
    "messages":[message]
  };
  
  //オプションを定義
  var options = {
    url: url,
    headers: headers,
    json: true,
    body: data
   };  
  
  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //console.log(body);
    } else {
      console.log('error: '+ JSON.stringify(response));
    }
  });
}






