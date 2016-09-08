var express = require('express');
var router = express.Router();
var fetch = require('../storage/fetch.js');

/* GET users listing. */
var id=0;
router.get('/', function(req, res, next) {
	
	if(req.query.set=="clear"){
		console.log("clear-db making");
		res.send('respond with a resource');
	}

	else if(req.query.set=="check"){
		data=fetch.allReadandResponse(res,++id);
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
	
});

router.post('/',function(req, res){
	res.send('respond with a resource');
	
});


module.exports = router;
