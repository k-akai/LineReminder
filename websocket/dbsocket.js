//var www=require('../bin/www.js');
exports.socket=[];

/*
var socketlist=[];
module.exports=function(io){
	var dbsocket=io.of('/dbsocket');
	dbsocket.on('connection',function (socket) {
		//socketlist.push(socket);
		console.log("socketcount:"+socketlist.length);
		socket.on('connectcount',function(data){
			//socket.emit('socketid',socket.id);
			//数字と、socketidをマッチさせておく
			lis={};
			lis.id=parseInt(data);
			list.socket=socket;
			socketlist.push(lis);	
		});

		socket.on('disconnect', function() {
			num=-1;
			for(i in socketlist){
				if(socketlist[i].socket===socket){
					num=i;
					break;	
				}
			}
			socketlist.splice(num,1);
			console.log("socket数:"+socketlist.length);
	    		console.log('disconnected');
		});	
	});
exports.socket=socketlist;
*/
