var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('form1reg.html', { title: '登録完了' })

});

module.exports = router;
