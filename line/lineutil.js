var share=require('../lib/share.js');
var dbutil=require('../storage/dbutil.js');


exports.dbTest=function(){

  console.log("test");

  dbutil.allReadTest(null,share.linec);


}




