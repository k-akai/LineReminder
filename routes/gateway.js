var express = require('express');
var router = express.Router();
var xml2js  = require('xml2js');


function makexml(){

	var xml2js  = require('xml2js');
	var builder = new xml2js.Builder({ rootName : 'soapenv:Envelope'});
	var header={"OK":""};
	var transport={"header":header,$:{'xmlns':"http://gutp.jp/fiap/2009/11/"}};
	var dataRS={"transport":transport,$:{'xmlns:ns2':"http://soap.fiap.org/"}};

	var body={"ns2:dataRS":dataRS};
	var root = {"soapenv:Body":body,$:{"xmlns:soapenv":"http://schemas.xmlsoap.org/soap/envelope/"}};
	var xml = builder.buildObject(root);
	return xml.toString();

}
/* GET users listing. */
router.get('/', function(req, res, next) {

	res.send('respond with a resource');
});

router.post('/',function(req, res){
	var data="";
	req.on('readable',function(chunk){
		
		console.log(a);
		console.log("\n");
		data+=req.read();
	});
	req.on('end',function(){
		console.log(data);
		xml=makexml();
		console.log("AAA");
		console.log(xml);
		res.send(xml);
	});
	/*
	//解析
	console.log(req.body());

	//生成
	xml=makexml();
	console.log(xml);
	res.send(xml);
	*/


});

	//res.send('<?xml version=\'1.0\' encoding=\'UTF-8\'?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Body><ns2:dataRS xmlns:ns2="http://soap.fiap.org/"><transport xmlns="http://gutp.jp/fiap/2009/11/"><header><OK /></header></transport></ns2:dataRS></soapenv:Body></soapenv:Envelope>')
	


module.exports = router;
