var xml2js  = require('xml2js');
var parser = require('xml2json');


//xml2jsがns使えないのでparse前にnamespaceを取るメソッド
function deleteNS(data){
	//var regExp=RegExp(/:/g)
	data=data.replace(/<[a-zA-Z0-9]*:/g,"<");
	data=data.replace(/<\/[a-zA-Z0-9]*:/g,"<\/");
	data=data.replace(/<\/Envelope>null/g,"<\/Envelope>");
	return data
}

//xmlj2sで作ったxmlがエラーを吐くので修正してみる
function deleteSpace(data){
	data=data.replace(/[\n\r]/g,"");
	data=data.replace(/\s\s+/g,"");
	return data;
}

exports.parseWrite=function(data){
	//xml2jsがns使えないのでparse前にnamespaceを取る
	console.log(data)
	data=deleteNS(data)

	//jsonに変換
	var json = JSON.parse(parser.toJson(data));
	pointlist=json["Envelope"]["Body"]["dataRQ"]["transport"]["body"]["point"];
	for(var i in pointlist){
		console.log("point="+pointlist[i]["id"]);
		point =	pointlist[i]["id"];
		for(var j in pointlist[i]["value"]){
			value= pointlist[i]["value"][j];
			console.log("time="+value["time"]);
			console.log("value="+value["$t"]);
		}
	}
	
	return "al";
}

//writeに対するok(暫定)
exports.makeOk=function(){
	
	var builder = new xml2js.Builder({ rootName : 'soapenv:Envelope'});
	var header={"OK":""};
	var transport={"header":header,$:{'xmlns':"http://gutp.jp/fiap/2009/11/"}};
	var dataRS={"transport":transport,$:{'xmlns:ns2':"http://soap.fiap.org/"}};

	var body={"ns2:dataRS":dataRS};
	var root = {"soapenv:Body":body,$:{"xmlns:soapenv":"http://schemas.xmlsoap.org/soap/envelope/"}};
	var xml = builder.buildObject(root);
	var str=deleteSpace(xml.toString());
	return str;
}


