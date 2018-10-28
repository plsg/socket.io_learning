var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    // io.emit('this', { will: 'be received by everyone' });
    // console.log('a user connected');
    socket.broadcast.emit('user connected', 'New participant');
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    
    socket.on('typing', function () {
        console.log('typing');
        socket.broadcast.emit('typing', 'someone is typing');
    });
    socket.on('not typing', function () {
        console.log('not typing');
        socket.broadcast.emit('not typing', '...');
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});