var mongo = require('mongodb');
var co  = require('co');

//console.log("DB connection start");
var dbname=(process.env.DBNAME);
var host=(process.env.DBHOST);
var port=(process.env.DBPORT);
var usr=(process.env.DBUSER);
var pass=(process.env.DBPASS);


//console.log(process.env);
db = new mongo.Db(dbname, new mongo.Server(host, parseInt(port)/*mongo.Connection.DEFAULT_PORT*/, {}),{safe:true});
var collection;



db.open(function(err, db){
	if(err){
		console.error('DB接続エラー');
		throw(err);
	}
	console.log('DB接続完了');
	if (usr!=""){
		db.authenticate(usr, pass, function(err, res) {
		    if(!err) {
		        console.log("Authenticated");
		    } else {
		        console.log("Error in authentication.");
		        console.log(err);
		    }
		});
	}else{
		console.log("no Autenticate");
	}
	// 接続完了後にコレクション取得
	collection = db.collection("ieee1888");

	//export:test
	exports.col=collection;

});



// 書き込み用メソッド
exports.write = function(json){
	collection.insert(
		json,
		// 書き込み処理後のコールバック関数（省略可）
		function(err, data){
			if(err){
				console.error('書き込み時にエラーが発生しました');
				throw(err);
			}
			console.log('データ書き込み完了:',data);
	});
}


// 読み込み用メソッド
exports.read = function(){
	var cursor = collection.find();
	cursor.toArray(function(err, docs){
		// toArray用のコールバック関数
		if(err){
			console.error('読み込みエラー');
			throw(err);
		}
		console.log(docs);
	});
}

exports.allRead=function(){
	
	var cursor = collection.find();
	arrays=null;
	
	cursor.toArray(function(err, docs){
		arrays=[];
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

//作ったけど現状使わないので放置
/*
exports.allRead2=function(){
	var array=[];
	readTestx(array).then(function() {
  		console.log("finish");
	});
	return array;
}



function readTestx(arrays){
	return new Promise(function(){
		var cursor = collection.find();
		//arrays=[];
	
		cursor.toArray(function(err, docs){
			// toArray用のコールバック関数
			if(err){
				console.error('読み込みエラー');
				throw(err);
			}
			arrays.push(docs);
			console.log(docs);
		});
	});
}	
*/
function readTest(){
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







exports.clear=function(){
	
}

