#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('ieee1888app:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


var io = require('socket.io')(server);
var webPort = process.env.PORT || 3000;
server.listen(webPort);

//module.exports=ioexport={};
//socketlist=[];
//connectid=[];
//console.log(webPort);


//ioexport.io=io;
exports.ioexport=[];
exports.ioexport.push(io);

var dbsocket=io.of('/dbsocket');
socketlist=[];
dbsocket.on('connection',function (socket) {
	//console.log(socket.id);
	//console.log(socket);
	//特定用途のため、現状はプッシュしているだけ
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

/*
io.on('connection',function (socket) {
	//console.log(socket.id);
	//console.log(socket);
	//特定用途のため、現状はプッシュしているだけ
	socketlist.push(socket);
	console.log("socketcount:"+socketlist.length);

	//テスト用
	socket.on('msg',function (data) {
    		io.emit('msg', data);
	});

	
	socket.on('connectcount',function(data){
		io.emit('socketid',socket.id);
		//数字と、socketidをマッチさせておく
		
		//console.log(data);	
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
*/





