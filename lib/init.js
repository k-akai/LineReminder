var mongo = require('mongodb');
var share =require('./share.js');
var dbname=(process.env.DBNAME);
var host=(process.env.DBHOST);
var port=(process.env.DBPORT);
var usr=(process.env.DBUSER);
var pass=(process.env.DBPASS);

//console.log("dbの設定");
db = new mongo.Db(dbname, new mongo.Server(host, parseInt(port)/*mongo.Connection.DEFAULT_PORT*/, {}),{safe:true});
db.open(function(err, db){
  if(err){
	console.error('DB接続エラー');
	throw(err);
  }
  console.log('DB connect');
  if (usr!=""){
	db.authenticate(usr, pass, function(err, res) {
	    if(!err) {
	        console.log("Authenticated");
	    } else {
	        console.log("Error in authentication.");
	        console.log(err);
	    }
	});
  }else{
	console.log("no Autenticated");
  }
  // 接続完了後にコレクション取得
  share.db=db;
  //毎回collectionのオブジェクトつくるのは微妙そうなのでここで作ってしまう
  //ieee1888collection = db.collection("ieee1888");
  //share.ieee1888collection=ieee1888collection;
  lineuser = db.collection("lineuser")
  share.dblineuser = lineuser
  lineimagedata = db.collection("lineimage")
  share.dbimagedata = lineimagedata
  lineremaind=db.collection("lineremaind")
  share.dbremaind=lineremaind
  
});

//socket
var dbsocket=share.io.of('/dbsocket');
socketlist=[];
share.dbsocketlist = socketlist;
dbsocket.on('connection',function (socket) {
	//console.log(socket.id);
	//console.log(socket);
	//特定用途のため、現状はプッシュしているだけ
	socketlist.push(socket);
	console.log("dbsocket-count:"+socketlist.length);

	//テスト用
	socket.on('msg',function (data) {
		//console.log(data);
    		socket.emit('msg', data);
	});

	
	socket.on('connectcount',function(data){
		socket.emit('socketid',socket.id);
		//数字と、socketidをマッチさせておく
		
		//console.log(data);
		//console.log("dataadd");	
	});

	socket.on('disconnect', function() {
		num=-1;
		for(i in socketlist){
			if(socketlist[i]===socket){
				num=i;
				break;	
			}
		}
		socketlist.splice(num,1);
		console.log("dbsocket-count:"+socketlist.length+"disconnect");
    		//console.log('disconnected');
	});
		
});


