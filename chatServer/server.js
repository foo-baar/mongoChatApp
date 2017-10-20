let express = require('express'),
    path = require('path'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    port = 4000,
    users = [];


server.listen(port, function () {
    console.log('listening on 4000');
})

io.on('connection', function (socket) {
    console.log('new conneciton made');

    //New User Joins
    socket.on('join', (data) => {
        socket.nickname = data.nickName;
        users[socket.nickname] = socket;

        let userObj = {
            nickName: data.nickName,
            socketId: socket.id
        }
        users.push(userObj);
        io.emit('onlineUsers', users);
    })
    //Broadcast Messages
    socket.on('send-message', (data) => {
        io.emit('message-received', data);
    });
    //Private Message
    socket.on('send-private-message', (data) => {
        socket.broadcast.to(data.to).emit('private-message', data);
    });
    //Disconnected from socket
    socket.on('disconnect',() =>{
        users = users.filter((item) =>{
            return item.nickName !== socket.nickname;
        });
        io.emit('onlineUsers', users);
    })

})