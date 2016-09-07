var express = require('express');
var router = express.Router();
var db = require('../storage/connection.js');
var fetch = require('../storage/fetch.js');
var www=require('../bin/www.js');

/* GET users listing. */
var id=0;
router.get('/', function(req, res, next) {
	
	if(req.query.set=="clear"){
		console.log("clear-db making");
		res.send('respond with a resource');
	}

	else if(req.query.set=="check"){
		data=db.allRead();
		console.log("data");
		console.log(data);
		//res.send(data);


		 res.render('test.html', { 
				title:"タイトルです",
			        content:"これはサンプルで作成したテンプレートです。",
		});	
	
	}else if(req.query.set=="checknow"){
		data=fetch.allReadandPush();
		id++;
		host=process.env.HOSTNAME;

		if (process.env.HOSTNAME=="localhost"){
			host+=":"+www.port;
		}
	
		res.render('db.html', { 
				title:"タイトルです",
				id:id,
				host:host,
			        content:"これはサンプルで作成したテンプレートです。",
		});	
	}
	
});

router.post('/',function(req, res){
	res.send('respond with a resource');
	
});

module.exports = router;
