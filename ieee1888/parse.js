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

exports.parseWrite2=function(data){
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

		//複数ある場合と１つしかない場合で挙動が違うため
		var val2=pointlist[i]["value"];
		array=null;
		if (Array.isArray(val2)==false){
			array=[1];
			array[0]=val2;
		}else{
			array=val2;
		}

		for(var j in array){
			value= array[j];
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


exports.parseWrite=function(data){
	//xml2jsがns使えないのでparse前にnamespaceを取る
	//console.log(data)
	data=deleteNS(data)
		
	//jsonに変換
	var json = JSON.parse(parser.toJson(data));
	point=json["Envelope"]["Body"]["dataRQ"]["transport"]["body"]["point"];
	if(point["id"]==undefined){
		for(var i in point){

			checkPoint(point[i]);
		}
	}else{
		checkPoint(point);
	}
	return "aa";
}

function checkPoint(point){

	//pointに対して、valueが１つ、かつ、timeがない場合
	if (typeof point["value"]=="string"){
		//時間を生成
		checkValue(point["id"],null,point["value"]);
	}else{
		//valueがひとつしかないのか、複数あるのか。ちなみにvalueが複数ある場合はtimeが必須という前提
		if(point["value"]["time"]==undefined){	
			for (var x in point["value"]){
					checkValue(point["id"],point["value"][x]["time"],point["value"][x]["$t"]);
				
			}
		}else{
			checkValue(point["id"],point["value"]["time"],point["value"]["$t"]);
		}	
	}
		
}
function checkValue(point,time,val){
	console.log("point="+point);
	console.log("time="+time);
	console.log("val="+val);

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


