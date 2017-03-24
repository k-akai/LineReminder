var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('form1.html', {
	title: '登録画面',
	id:'30',
	user: 'かずゆき',
	location:'本町',
	school:'海神小学校',
	child1name:'ゆきと',
	child1birth:'2012/12/20',
	child2name:'まどか',
	child2birth:'2014/04/30'
    })

});

module.exports = router;
