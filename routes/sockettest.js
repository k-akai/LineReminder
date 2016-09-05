var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
	
	
	 res.render('socket.html', { 
				title:"タイトルです",
			        content:"これはサンプルで作成したテンプレートです。",
	});	
	//res.send('respond with a resource');

});




module.exports = router;

