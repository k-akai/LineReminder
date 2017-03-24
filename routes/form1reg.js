var share =require('../lib/share.js');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (!req.query.id) {
	res.render('form1reg.html', { title: '登録ERROR' });
	return;
    }

    var db=share.db;
    var lineuser = db.collection("lineuser")
    var cursor = lineuser.find();
    cursor.toArray(function(err, docs){
        // toArray用のコールバック関数
        if(err){
	    console.error('読み込みエラー');
	    throw(err);
	}
	console.log(docs);
    });

    //すでにデータがあるかをチェックする
    var jsonw={"id":req.query.id,"location":req.query.location}
    console.log(req.query.id)
    console.log(jsonw)
    /*
    lineuser.insert(
	json,
	// 書き込み処理後のコールバック関数（省略可）
	function(err, data){
	    if(err){
		console.error('書き込み時にエラーが発生しました');
	        throw(err);
	    }
	    console.log('データ書き込み完了:',data);
	    res.render('form1reg.html', { title: '登録完了' });

	});
     */
    res.render('form1reg.html', { title: '登録完了' });

});

module.exports = router;
