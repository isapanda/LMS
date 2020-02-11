//Call modules
var http = require('http');
var socketio = require("/home/pi/.nvm/versions/node/v8.11.1/lib/node_modules/socket.io")
var url = require('url');
//var socketio = require("socket.io");
var fs = require('fs');
var exec = require('child_process').exec;
//const button = document.querySelector('.js-button');
// set-server

//var express = require('/home/pi/.nvm/versions/node/v8.11.1/lib/node_modules/express');
//var app = express();

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

	switch (url.parse(req.url).pathname) {
        case '/':
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(fs.readFileSync('/home/LMS/index5.html'));
	    break;

	case '/home/LMS/setting.html'  :
	    res.writeHead(200,{'Content-Type':'text/html'});
            res.end(fs.readFileSync('/home/LMS/setting.html'));
            break;
	}

    //res.writeHead(200,{'Content-Type':'text/html'});
    //res.end(fs.readFileSync('/home/LMS/index5.html',''));
  }

//});
}).listen(9000);

var io = socketio.listen(server);

console.log("LMS_Running...");
var result=[];
var interval;
var threshold;
var drivetime;


function getCSV(){
	 result=fs.readFileSync('/home/LMS/setting.csv','utf8').split(',');
console.log(result[0]);
interval=result[0];
threshold=result[1];
drivetime=result[2];
pompMode=result[3];
}

var readResult = getCSV();
//console.log(readResult);

var ggg
ggg = setInterval(function(){
//round-check
//function repeat(){
//var repeat = function(){
  exec("sudo python /home/LMS/lms.py",function(error,stdout,stderr){
    io.sockets.emit('chart',{str:"--"+stdout});
     console.log("stdout:",{Data:"--"+stdout});
     console.log("stderr:",+stderr);
     var box = stdout.split(',');
     if (threshold > box[3] && pompMode == "ON")
     exec("sudo python /home/LMS/mortor.py");
// console.log(result);
  }); },interval);
//ggg = setTimeout(repeat,interval)}

//repeat();


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
	})

	socket.on('submit',function(str) {
	  fs.writeFile('/home/LMS/setting.csv',str,'utf8',function(err){
		if(err){
			console.log('Unable save the file');
		}else{
			console.log('Success save file');
			clearInterval(ggg);
			getCSV(); //ここに
			ggg = setInterval(function(){
			  exec("sudo python /home/LMS/lms.py",function(error,stdout,stderr){
    			  io.sockets.emit('chart',{str:"--"+stdout});
     			  console.log("stdout:",{Data:"--"+stdout});
     			  console.log("stderr:",+stderr);
     			  var box = stdout.split(',');
     			  if (threshold > box[3] && pompMode == "ON")
     				exec("sudo python /home/LMS/mortor.py");
			  }); },interval);
		}
	 });
        });

	socket.on('shutdown',function() {
	  exec("sudo sh /home/LMS/shutdown.sh",function(){
          });
        })

});
