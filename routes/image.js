var express = require('express')
var router = express.Router()
var linedb=require('../storage/line.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  //idを取得
　 var id = req.query.id
  var resp = linedb.idFind(id)
  console.log("aa")
  console.log(resp)
  if (resp==null){
	res.send("no data")
  } else {
    res.send(id)
  }
  //コンテンツが登録されていない場合はエラー
　　
	/*
	if(req.query.db=="ieee1888"){
		if(req.query.control=="clear"){
			console.log("clear-db making");
			db.clear(share.ieee1888collection);
			data=ieee1888db.pushSocket();
			res.render('db.html', { 
				title:"DB",
				id:id,
				host:process.env.HOSTNAME+"/dbsocket",
			        tabledata:[],
			});
	*/
});

module.exports = router
