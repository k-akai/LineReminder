var express = require('express');
var router = express.Router();

var io = require('../bin/www')


/* GET users listing. */
router.get('/', function(req, res, next) {
	
	 res.render('socket2.html', { 
				title:"タイトルです",
			        content:"これはサンプルで作成したテンプレートです。",
	});	
	//res.send('respond with a resource');

});



module.exports = router;

