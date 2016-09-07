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



exports.allReadandResponse=function(res,id){
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
		var resp="<table><tr><th>point</th><th>time</th><th>value</th></tr>";
		if (docs!=null && docs.length!=0){
			
			for (var i in docs){
				resp+="<tr>";
				resp+="<td>"+docs[i].point+"</td>";
				resp+="<td>"+docs[i].time+"</td>";
				resp+="<td>"+docs[i].value+"</td>";
				resp+="</tr>";
			}
			resp+="</table>";
		}
		var host=process.env.HOSTNAME;

		if (process.env.HOSTNAME=="localhost"){
			host+=":"+process.env.PORT;
		}
		res.render('db.html', { 
				title:"DB",
				id:id,
				host:host,
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



