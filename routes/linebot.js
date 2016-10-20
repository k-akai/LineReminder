var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var lineapi=require('../line/lineapi.js');
var lineu=require('../line/lineutil.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

//jsonファイルを出力する.デバッグ用
function output(jsonS){
  var fs = require('fs');
  fs.writeFile('hoge.json',JSON.stringify(jsonS,null, "    "));
}

router.post('/',function(req, res){
    //ログを出力する場合に使う
    output(req.body);

    //eventのデータを取得
    var json = req.body.events;

    for(var i in json){
	   //イベントが複数発生している場合
	    if(i>0){
	      console.log("複数のイベントをもらっているので処理が不明");
	      console.log(json);
	      return;
	    }

	    //各種データの取得
	    var type=json[i].type;
	    var repToken=json[i].replyToken;
	    var timestamp=json[i].timestamp;
	    var date=new Date(parseInt(timestamp));

	    var source=json[i]["source"];
	    //source format
	    // { userId: 'xxx', type: 'user' }
	    // { roomId: 'yyy', type: 'room' }
	    
	    var message=json[i]["message"];
	    //message format
	    //{ type: 'text', id: 'zzz', text: 'あ' }

	    //message以外のイベント
	    if (type!="message"){
	      console.log("message以外のイベントは対応が不明");
	      console.log(json);
	      break;
	    }
	    
	    //各種処理の分岐をする
	　　　　//家計簿botの場合のルールを設定
	    data={};
	    brunch=lineu.judgeBrunchMessage(source,message,data);　　　　　　　　　　　　

	    //messageイベント
	    if (brunch==1){
		var text=message.text;
		//lineapi.pushMessage(data.id,data.messages);
		lineapi.replyMessage(repToken,"解析中…");
	 	res.send(req.body);
		//return;
	    }else if(brunch==2){
		lineapi.getContent(message.id,"local/image/"+message.id);
　　　　　　　　　　　　　　　　res.send(req.body);
	    }else{
		res.send(req.body);
		//return;
	    } 
     }
});

module.exports = router;
