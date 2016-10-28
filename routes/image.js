var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
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

module.exports = router;
