var share=require("../lib/share.js");
//var collection=share.ieee1888collection;

// 読み込み用メソッド
function pushSocket(id){
	var collection=share.ieee1888collection;
	if (share.dbsocketlist!=null&&share.dbsocketlist.length!=0){
		//console.log(share.dbsocketlist.length);
	}else{
		//console.log("no socketlist");
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
	cursor.toArray(a(id));

        function a(id){
		return function(err, docs) {
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
		}
                
	}
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

function makekeys(data){

	var ret={
		$or:[]
		};
	
	
	
	var keys=data["keys"];

	for (var i in keys){
		var and={
			$and:[]
		};

		var p={};
		p.point=keys[i]["id"];

		and["$and"].push(p);

		
		var time={};
		var timeflag=false;
		if (keys[i]["eq"]!=undefined){
			timeflag=true;
			time["time"]=new Date(keys[i]["eq"]);
		}else{
			param={};
			paramflag=false;

			if(keys[i]["gt"]!=undefined){
				param["$gt"]=new Date(keys[i]["gt"]);
				paramflag=true;
				timeflag=true;
				
			}

			if(keys[i]["lt"]!=undefined){
				param["$lt"]=new Date(keys[i]["lt"]);
				paramflag=true;
				timeflag=true;
			}


			if(keys[i]["gteq"]!=undefined){
				param["$gte"]=new Date(keys[i]["gteq"]);
				paramflag=true;
				timeflag=true;
			}

			if(keys[i]["lteq"]!=undefined){
				param["$lte"]=new Date(keys[i]["lteq"]);
				paramflag=true;
				timeflag=true;
			}

			if(paramflag==true){
				time["time"]=param;
				timeflag=true;
			}


		}

		if (timeflag==true){
			and["$and"].push(time);
		}

		ret["$or"].push(and);
	}

	return ret


}


exports.fetchSearchAndPush=function(keys,res,data,func){

	var collection=share.ieee1888collection;
	ret=makekeys(data);
	
	// db.ieee1888.find({$or:[{$and:[{"point":"http://www.fiap.jp/out7"},{"time":{"$gte":ISODate("2011-11-01T00:00:00+09:00")}}]},{"point":"http://www.fiap.jp/out6"}]})

	var date=new Date("2011-11-02T00:00:00+09:00");
	var cursor = collection.find(ret).sort({'time':-1});
	cursor.toArray(function(err,docs){
		//前処理
		if(err){
			console.error('エラーが発生しました');
			throw(err);
		}
		
		func(err,docs,res,data);
	});

}	

function nowData(docs){
	console.log(docs);
	return docs;
}

module.exports.pushSocket=pushSocket;

