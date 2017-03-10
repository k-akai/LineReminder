var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('registration.html', { title: '登録画面' })

});

module.exports = router;
