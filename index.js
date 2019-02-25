//Call modules
var http = require('http');
var socketio = require("/home/pi/.nvm/versions/node/v4.2.4/lib/node_modules/socket.io")
//var socketio = require("socket.io");
var fs = require('fs');
var exec = require('child_process').exec;
//const button = document.querySelector('.js-button');
// set-server

var express = require('/home/pi/.nvm/versions/node/v8.11.1/lib/node_modules/express');
var app = express();

//var server = require('http').Server(app);

//var io = require('socketio')(server);

var server = http.createServer(function(req,res){

//app.get('/',function(req,res){

// get-fileName
  var urls = req.url.split("?")[0].split("/");
  var path = "/home/LMS/"
  var pictpath = "/home/LMS/pict/"
  var fileName = path + urls[urls.length-1];
  var pictName = pictpath + urls[urls.length-1];

if(fileName.match(/.js$/)){
    res.writeHead(200,{'Content-Type':'text/javascript'});
   res.end(fs.readFileSync(fileName));
// res.end(fs.readFileSync('/home/LMS/chart.min.js','utf8'));
  }
// &#46; = .
   if(fileName.match(/&#46;css$/)){
    res.writeHead(200,{'Content-Type':'text/css'});
    res.end(fs.readFileSync(fileName,'utf8'));
  }

  else if(fileName.match(/.csv/)){
    res.writeHead(200,{'Content-Type':'text/csv'});
    res.end(fs.readFileSync(fileName,'utf8'));
  }

  else if(fileName.match(/.png/)){
    res.writeHead(200,{'Content-Type':'img/png'});
//	var output2 = fs.readFileSync(fileName);
//	var output2 = fs.readFileSync("/home/LMS/Reload.png");
    res.end(fs.readFileSync(pictName));
  }

/*  else if(req.method ==='POST'){
  console.log("POST");
  }*/


  else{
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(fs.readFileSync('/home/LMS/index5.html',''));
  }

  app.get('/',function(req,res){
	res.send('ttt');
	console.log("OKOK");})
//});
}).listen(9000);

var io = socketio.listen(server);

console.log("LMS_Running...");

//round-check
setInterval(function(){
  exec("sudo python /home/LMS/lms.py",function(error,stdout,stderr){
    io.sockets.emit('chart',{str:"--"+stdout});
     console.log("stdout:",{str:"--"+stdout});
     console.log("stderr:",+stderr);
  });
},600000);


io.sockets.on("connection", function(socket){
    
	socket.on('getdata', function() {
   	  exec("sudo python /home/LMS/lms.py",function(error,stdout,stderr){
   	  io.sockets.emit('chart', {str:"--"+stdout});
	  console.log('stdout',{str:"--"+stdout});
	  });
	});

	socket.on('drivemortor',function() {
	  exec("sudo python /home/LMS/mortor.py",function(){
	  console.log("booooonnn....");
	  });
	});
});
