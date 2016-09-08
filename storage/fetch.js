var mongo = require('mongodb');
var db=require("../storage/connection.js");
//var socket=("../websocket/dbsocket.js");
var share=require("../lib/share.js");
// 読み込み用メソッド
exports.pushSocket = function(id){
	//console.log("pushsocket open");
	//console.log(share.dbsocketlist);
	if (share.dbsocketlist!=null&&share.dbsocketlist.length!=0){
		//console.log(share.dbsocketlist.length);
	}else{
		console.log("no socketlist");
		return
	}
	var collection=db.col;
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
	var collection=db.col;
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


function readTest(){
	var collection=db.col;
	console.log(collection);
	var cursor = collection.find();
	arrays=[];
	
	cursor.toArray(function(err, docs){
		// toArray用のコールバック関数
		if(err){
			console.error('読み込みエラー');
			throw(err);
		}
		arrays.push(docs);
		console.log(docs);
	});
	return arrays;

}



