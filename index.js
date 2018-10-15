const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000, () => {
    console.log('Listening to requests on port 3000');
});

app.use(express.static('public'));

// Socket setup
const io = socket(server);
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);

    // Emit events
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data); // to everyone
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data); // to evetyone except emitter
    });
});