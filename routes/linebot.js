var express = require('express');
var router = express.Router();


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
  'Authorization': 'Bearer YOUR_ACCESS_TOKEN '+ channnelAccessToken
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
function　bot() {
  if(err){
   return;
  }
  //ヘッダーを定義
  var headers = {
  'Content-Type' : 'application/json; charset=UTF-8',
  'X-Line-ChannelID' : channel,
  'X-Line-ChannelSecret' : csecret,
  };

  // 送信相手の設定（配列）
  var to_array = [];
  to_array.push(json['result'][0]['content']['from']);


  // 送信データ作成
  var data = {
    'to': to_array,
    'toChannel': 1383378250, //固定
    'eventType':'140177271400161403', //固定
    "content": {
        "messageNotified": 0,
        "messages": [
            // テキスト
            {
               "contentType": 1,
               "text": 'test',
                    }/*,
                    // 画像
                    {
                        "contentType": 2,
                        "originalContentUrl": search_result['shop_image1'],
                        "previewImageUrl": search_result['shop_image1']
                    },
                    // 位置情報
                    {
                        "contentType":7,
                        "text": search_result['name'],
                        "location":{
                            "title": search_result['address'],
                            "latitude": Number(search_result['latitude']),
                            "longitude": Number(search_result['longitude'])
                        }
                    }
		    */
                ]
            }
        };
        //オプションを定義
   var options = {
            url: 'https://trialbot-api.line.me/v1/events',
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
router.post('/callback',function(req, res){
    console.log(req);
    // LINE BOT
    //bot();


});

module.exports = router;
