var express = require('express');

var app = express.createServer(express.logger()); 

var net = require('net');

app.use(express.static(__dirname + '/public'));

app.get('/target', function(request, response){
  response.sendfile('public/target.html');
});

app.get('/provider', function(request, response){
  response.sendfile('public/provider.html');
});

var io = require('socket.io').listen(app);
var clients = [];
mouseData = 0;
var haveTarget = false;
var targetId = null;
var targetIndex = null;

io.sockets.on('connection', function (socket) {
  //add client to client array
  clients.push(socket);

  //ping connecting client to see if it's a target or a provider
  socket.emit('whoIs', "");

  socket.on('Iam', function(data){
    //console.log("the connecting client is a: " + data);
    if(data === 'target'){
      //if target client does not yet exist identify target client id 
      if(haveTarget === false){
        haveTarget = true;
        targetId = socket.id;
        for(var i = 0; i < clients.length; i++){
          if(clients[i].id === targetId){
              targetIndex = i;
              console.log("target index is: " + targetIndex);
          }
        }
        socket.emit('target', "");
      }
      //if target client already exists, respond with an error message
     else{
      socket.emit('targetExists', "");
     }
    }else if(data === 'provider'){
      if(haveTarget){
        socket.emit("mouseMover", clients.length);

        clients[targetIndex].emit('createAttractor', "");
      }else{
        
      }    
    }
  });
   
   //when mouse position data is recieved from a data-provider, send it to target client 
  socket.on('mousePosition', function(data){
			clients[targetIndex].emit('values', data);	
 	})

//if a client disconnects, find the index of the disconnected client and send client id to sketch to be removed
  socket.on('disconnect', function (data){
    var disconnectId = 0;
    for(var i = 0; i < clients.length; i++){
      if(socket.id === clients[i].id){
        disconnectId = i - 1;
        console.log("disconnecting client " + socket.id);
        clients.remove(i);
      }
    }
    if(socket.id != clients[targetIndex].id){
      clients[targetIndex].emit('disconnectClient', disconnectId);
    }else{
      console.log("target disconnected");
    }
  })

});

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Listening on " + port);
});
