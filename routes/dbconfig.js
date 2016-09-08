var express = require('express');
var router = express.Router();
//var fetch = require('../storage/fetch.js');
var ieee1888db=require('../storage/ieee1888.js');
/* GET users listing. */
var id=0;
router.get('/', function(req, res, next) {
	
	if(req.query.db=="ieee1888"){
		if(req.query.control=="clear"){
			console.log("clear-db making");
		}else if(req.query.control="view"){
			data=ieee1888db.allReadandResponse(res,++id);
		}else{
			res.send('controlを指定');
		//res.send('respond with a resource');
		}
	}else{
		res.send('未実装です');
	}
	/*
	else if(req.query.set=="check"){
		

	}else if(req.query.set=="checknow"){
		data=fetch.allReadandPush();
		id++;
		
		res.render('db.html', { 
				title:"タイトルです",
				id:id,
				host:process.env.HOSTNAME+"/dbsocket",
			        content:"これはサンプルで作成したテンプレートです。",
		});	
	}
	*/
	
});

router.post('/',function(req, res){
	res.send('respond with a resource');
	
});


module.exports = router;
