var share = require('../lib/share.js')
var async = require('async')
var lineapi = require('../line/lineapi.js')

exports.setImage = function (source, message) {
  async.waterfall([
    function (callback) {
      // console.log('DBの確認')
      var json = {'id': message.id}
      var cursor = share.dbimagedata.find(json)
      cursor.toArray(function (err, docs) {
        // toArray用のコールバック関数
        if (err) {
          console.error('読み込みエラー')
          throw (err)
        }
        // console.log("db-result-lineimage")
        // console.log(docs)
        callback(null, docs)
      })
    },

    function (docs, callback) {
      // console.log('データのあるなしの確認');
      // データがない場合は追加
      if (docs.length === 0) {
        var json = {'id': message.id, 'source': source}
        share.dbimagedata.insert(json, function (err, data) {
          if (err) {
            console.log('書き込み時にエラーが発生しました')
            throw (err)
          }
          console.log('データ書き込み完了:', data)
          callback(null, message.id)
        })
      } else {
        callback(null, null)
      }
    },
    function (id, callback) {
      if (id != null) {
        console.log('コンテンツの取得')
        lineapi.getContent(message.id, 'local/image/' + message.id)
      } else {
        console.log('すでにコンテンツがあるため、取得しません')
      }
      callback(null)
    }
  ], function (err, arg1) {
    if (err) {
      throw err
    }
  })
  return
}
/*
exports.userFind=function(id){
var cursor = share.lineuser.find({"sid":id});

cursor.toArray(function(err, docs){
	// toArray用のコールバック関数
	if(err){	
		console.error('読み込みエラー');
		throw(err);
	}
　　　　　　　　　　　	console.log("db-result");
	console.log(docs);
	
});
}
*/
