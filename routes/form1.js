var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('form1.html', {
	title: '登録画面',
	name1: 'たろう'})

});

module.exports = router;
