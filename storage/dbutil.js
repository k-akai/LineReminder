
//読み込み用メソッド
exports.allReadTest=function(res,collection){
	
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


// 書き込み用メソッド
exports.write = function(json,collection){
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




exports.clear =function(collection){

	collection.remove();
}



