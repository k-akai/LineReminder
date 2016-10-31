var share=require('../lib/share.js');
//var dbutil=require('../storage/dbutil.js');
var linedb=require('../storage/line.js');

exports.dbTest=function(){

  console.log("test");

  dbutil.allReadTest(null,share.linec);


}


//どの処理を実施するか割り当てる
exports.checkCallback = function(source,message,data) {
  data.id = "aaa";
  data.messages = "テストテスト";
  id = null;
  if (message.type === "image") {
    // データがあるかをチェック
　　　　linedb.setImage(source,message)
    return 3;
  }
  if (source.type=="room"){
    id=source.roomId;
  }else if(source.type=="user"){
    id=source.userId;
  }
  linedb.userFind(id);
  return 1;
}



