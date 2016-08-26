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
	//console.log(data)
	data=deleteNS(data)
		
	//jsonに変換
	var json = JSON.parse(parser.toJson(data));
	pointlist=json["Envelope"]["Body"]["dataRQ"]["transport"]["body"]["point"];
	
	var retList=[];

	//console.log(pointlist);
	for(var i in pointlist){
		valuelist=[];

		//もう少し改善方法を考えてみる
		
		/*
		var val2=pointlist[i];

		console.log(val2);
		array=[1];
		if (Array.isArray(val2)==false){
			array[0]=val2;
		}else{
			array=val2;
		}
					
		if (Array.isArray(array)==false){
			console.log("???");
		}else{
			console.log("length="+array.length);
		}
		console.log("---");
		console.log(array[0]);
		*/
		
		if (!(pointlist[i]["value"].length >=1)){
			console.log("aa")
			var time=null;
			var val=null;
			value= pointlist[i]["value"]
			if(value["time"]!=undefined){
				time=value["time"];
			}
			if(value["$t"]!=undefined){
				val=value["$t"];
			}
			valuelist.push([time,val]);
			retList.push([pointlist[i]["id"],valuelist]);
			continue;
		}
		
		for(var j in pointlist[i]["value"]){
			value= pointlist[i]["value"][j];
			var time=null;
			var val=null;
			if(value["time"]!=undefined){
				time=value["time"];
			}
			if(value["$t"]!=undefined){
				val=value["$t"];
			}
			valuelist.push([time,val]);
		}
		retList.push([pointlist[i]["id"],valuelist]);
	}
	for (var i in retList){
		console.log(retList[i]);
	}
	return retList;
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


