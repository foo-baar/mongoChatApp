var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, function () {
    console.log('listening on *:4000');
});

io.on('connection', function (socket) {
    console.log('a user connected ', socket.client.id );
    socket
    .on('disconnect', function () {
        console.log('user disconnected');
    })
    .on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg );
        
        socket.to(socket.client.id).emit('hey', 'I just met you');
      });
});