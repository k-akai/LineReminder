var express = require('express');
var router = express.Router();
var db = require('../storage/connection');

/* GET users listing. */
router.get('/', function(req, res, next) {
	
	if(req.query.set=="clear"){
		console.log("clear-db");
		res.send('respond with a resource');
	}else if(req.query.set=="check"){
		data=db.allRead();
		console.log("data");
		console.log(data);
		res.send(data);	
	}
	
});

router.post('/',function(req, res){
	res.send('respond with a resource');
	
});

module.exports = router;
