var www=require('../bin/www.js');

var dbsocket=io.of('/dbsocket');

var socketlist=[];
dbsocket.on('connection',function (socket) {

	socketlist.push(socket);
	console.log("socketcount:"+socketlist.length);

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
		console.log("socketcount:"+socketlist.length);
    		console.log('disconnected');
	});
		
});
