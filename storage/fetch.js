var mongo = require('mongodb');
var db=require("../storage/connection.js");

// 読み込み用メソッド
exports.read = function(){
	var collection=db.col;
	console.log(collection);
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



exports.allReadandResponse=function(res){
	var collection=db.col;
	//console.log(collection);
	var cursor = collection.find();
	arrays=null;
	
	cursor.toArray(function(err, docs){
		// toArray用のコールバック関数
		if(err){	
			console.error('読み込みエラー');
			throw(err);
		}
		console.log(docs);
		var resp="";
		if (docs!=null && docs.length!=0){
		
			for (var i in docs){
				resp+="point:"+docs[i].point+"<br>";
			}
		}
		res.render('test.html', { 
				title:"DB",
			        content:resp,
		});

	});

	return arrays;

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



