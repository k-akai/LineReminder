var share=require('../lib/share.js');

exports.userFind=function(id){
	var cursor = share.linec.find({"sid":id});
 
	cursor.toArray(function(err, docs){
		// toArray用のコールバック関数
		if(err){	
			console.error('読み込みエラー');
			throw(err);
		}
　　　　　　　　　　　
		console.log(docs);
		
	});
}
