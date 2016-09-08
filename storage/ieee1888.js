var share=require("../lib/share.js");
//var collection=share.ieee1888collection;

// 読み込み用メソッド
function pushSocket(id){
	var collection=share.ieee1888collection;
	if (share.dbsocketlist!=null&&share.dbsocketlist.length!=0){
		//console.log(share.dbsocketlist.length);
	}else{
		console.log("no socketlist");
		return
	}
	
	var cursor = collection.find();
	cursor.toArray(function(err, docs){
		// toArray用のコールバック関数
		if(err){
			console.error('読み込みエラー');
			throw(err);
		}
		if (id==undefined){
			//全ソケットにプッシュする
			
			if (share.dbsocketlist!=null&&share.dbsocketlist.length!=0){
				for (var i in share.dbsocketlist){
					share.dbsocketlist[i].emit('refresh',docs);
				}
			}
			
			//console.log("pushしたつもり");
		}else{
			console.log("id:"+id);
			console.log("実装してください");
		}
		
	});
}

exports.allReadandResponse=function(res,id){
	var collection=share.ieee1888collection;
	var cursor = collection.find();
	cursor.toArray(function(err, docs){
		// toArray用のコールバック関数
		if(err){	
			console.error('読み込みエラー');
			throw(err);
		}
		console.log(docs);
		res.render('db.html', { 
				title:"DB",
				id:id,
				host:process.env.HOSTNAME+"/dbsocket",
			        tabledata:docs,
		});
	});
}

// 書き込み用メソッド
exports.writeAndView = function(json){
	var collection=share.ieee1888collection;
	collection.insert(
		json,
		// 書き込み処理後のコールバック関数（省略可）
		function(err, data){
			if(err){
				console.error('書き込み時にエラーが発生しました');
				throw(err);
			}
			console.log('データ書き込み完了:',data);
			console.log('push socket');
			pushSocket();
	});
}

exports.fetchSearchAndPush=function(res,data){
	var collection=share.ieee1888collection;
	var cursor = collection.find( { point: { $in: ['http://www.fiap.jp/out1','http://www.fiap.jp/out2'] }});
	cursor.toArray(function(err, docs){
		// toArray用のコールバック関数
		if(err){	
			console.error('読み込みエラー');
			throw(err);
		}
		console.log(docs);
		
		var xml="";
		xml+="<?xml version='1.0' encoding='UTF-8'?>"
		xml+='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Body><ns2:queryRS xmlns:ns2="http://soap.fiap.org/"><transport xmlns="http://gutp.jp/fiap/2009/11/"><header><OK />';
		xml+='<query id="'+data.id+'" type="'+ data.type+'">';
		for (var i in data["keys"]){
			xml+='<key ';
			var attrs=Object.keys(data["keys"][i]);
			console.log(attrs);
			for (var j in attrs){
				var x=attrs[j];
				xml+=x+'="'+data["keys"][i][x]+'"';
			}
			xml+='/>'
		}
		xml+="</query></header><body>";
		
		res.send(xml);
	
	});
}



module.exports.pushSocket=pushSocket;

