var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');


var channel=(process.env.LINE_CHANNEL_ID);
var csecret=(process.env.LINE_CHANNEL_ID_SEACRET);
var channelAccessToken=(process.env.LINE_CHANNEL_ID_SEACRET);
/* GET users listing. */
router.get('/', function(req, res, next) {

	res.send('respond with a resource');
});


function bottest(){
  var headers = {
  'Content-Type' : 'application/json; charset=UTF-8',
  'Authorization': 'Bearer '+ channnelAccessToken
  };
  var options = {
    url: 'https://api.line.me/v2/bot/message/reply',
    proxy : process.env.FIXIE_URL,
    headers: headers,
    json: true,
    body: data
  };

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
         console.log(body);
    } else {
         console.log('error: '+ JSON.stringify(response));
    }
  });
  
}






function reply(replyToken,text){
  var url = 'https://api.line.me/v2/bot/message/reply';
  var headers = {
  'Content-Type' : 'application/json; charset=UTF-8',
  'Authorization':'Bearer '+ channelAccessToken
  };

  var message={
    "type": "text",
    "text": "Hello, world"
  };
  var data={
    "replyToken":replyToken,
    "messages":[message]
  };
  
  //オプションを定義
  var options = {
    url: url,
    //proxy : process.env.FIXIE_URL,
    headers: headers,
    json: true,
    body: data
   };  

  console.log(data);
  
  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.log('error: '+ JSON.stringify(response));
    }
  });
};









//jsonファイルを出力する
function output(jsonS){
  var fs = require('fs');

  fs.writeFile('hoge.json',JSON.stringify(jsonS));
 
}


router.post('/',function(req, res){
    //ログを出力する場合に使う
    //output(req.body);

    console.log(req.body);
    res.send("aa");
    return;
    //eventのデータを取得
    var json = req.body.events;
    //イベントが複数発生している場合
    if(json.length!=1){
      console.log("複数のイベントをもらっているので処理が不明");
      console.log(json);
      return;
    }


    //各種データの取得
    var type=json[0].type;
    var repToken=json[0].replyToken;
    var timestamp=json[0].timestamp;
    
    var source=json[0]["source"];
    //source format
    // { userId: 'xxx', type: 'user' }
    // { roomId: 'yyy', type: 'room' }
    
    var message=json[0]["message"];
    //message format
    //{ type: 'text', id: 'zzz', text: 'あ' }
    
    //var userId=json[0].userId;
    var date=new Date(parseInt(timestamp));

 
    //message以外のイベント
    if (type!="message"){
      console.log("message以外のイベントは対応が不明");
      console.log(json);
      return;
    }

    
    //messageイベント
    if (message.type=="text"){
	
	var text=message.text;
	console.log(text);
	//reply(repToken,text);
 	res.send(req.body);
	return;
    }else{
	res.send(req.body);
	return;
    }
 
});




module.exports = router;
