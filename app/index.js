var http = require('http').Server();
var io = require('socket.io')(http);

const port = process.env.port || 3000;

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(port, function(){
  console.log(`Dasbhoard listening on *:${port}`);
});