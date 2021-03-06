var express = require('express');
var router = express.Router();
var xml2js  = require('xml2js');
//var ieee1888make =require('../ieee1888/make.js');
var ieee1888=require('../ieee1888/parse.js');

/* GET users listing. */
router.get('/', function(req, res, next) {

	res.send('respond with a resource');
});

router.post('/',function(req, res){
	var data="";
	req.on('readable',function(chunk){
		data+=req.read();
	});

	req.on('end',function(){

		//writeなら
		if(req.headers['soapaction']=='"http://soap.fiap.org/data"'){
			//解析
			var list=ieee1888.parseWrite(data);
			
			//console.log(list);
			//暫定OKを返す
			var xml=ieee1888.makeOk();
	
			res.send(xml);
		//fetchなら
		}else if(req.headers['soapaction']=='"http://soap.fiap.org/query"'){
			//解析
			//responselist
			responselist=[];
			data = ieee1888.parseFetch(data);
			//var list=ieee1888.parseFetch(data,responselist);
			ieee1888.makeFetchResonse(data,res);

			//res.send(xml);
		}else{
			console.log("未実装");
		}
	});
});

module.exports = router;
