var express = require('express')
var router = express.Router()
var async = require('async')
var share = require('../lib/share.js')

/* GET home page. */
router.get('/', function (req, res, next) {
  // idを取得
  var id = req.query.id
  async.waterfall([
    function (callback) {
      // console.log('DBの確認')
      var json = {'id': id}
      var cursor = share.dbimagedata.find(json)
      cursor.toArray(function (err, docs) {
        // toArray用のコールバック関数
        if (err) {
          console.error('読み込みエラー')
          throw (err)
        }
        callback(null, docs)
      })
    },
    function (docs, callback) {
      // データがない場合はrespを呼び出して終了
      if (docs == null || docs.length === 0) {
        res.send('idに対応する画像はありません')
        // callbackって不要？
      } else {
         // リマインダ情報をとってきて表示
        callback(null, docs)
      }
    }

  ], function (err, docs) {
    if (err) {
      throw err
    }
    res.render('reminder.html', { 
	id:id,
	host:process.env.HOSTNAME+"/dbsocket",
        tabledata:[],
    });   
  })
})

module.exports = router
