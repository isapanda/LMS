var http = require('http');
var socketio = require("socket.io");
var fs = require('fs');
var exec = require('child_process').exec;
 
// set-server
var server = http.createServer(function(req,res){
 
// get-fileName
  var urls = req.url.split("?")[0].split("/");
  var path = "/home/LMS/"
  var fileName = path + urls[urls.length-1];
 

if(fileName.match(/.js$/)){
    res.writeHead(200,{'Content-Type':'text/javascript'});
    res.end(fs.readFileSync('/home/LMS/chart.min.js','utf8'));
  }
  else if(fileName.match(/&#46;css$/)){
    res.writeHead(200,{'Content-Type':'text/css'});
    res.end(fs.readFileSync(fileName,'utf8'));
  }
  else if(fileName.match(/.csv/)){
    res.writeHead(200,{'Content-Type':'text/csv'});
    res.end(fs.readFileSync(fileName,'utf8'));
  }
  else{
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(fs.readFileSync('index5.html','utf8'));
  }
 
}).listen(9000);
 
var io = socketio.listen(server);
 
console.log("LMS_Running...");
 
//round-check
setInterval(function(){
  exec("sudo python lms.py",function(error,stdout,stderr){
    io.sockets.emit('chart',{str:"--"+stdout});
     console.log("stdout:",{str:"--"+stdout});
     console.log("stderr:",+stderr);
  });
},1000);
