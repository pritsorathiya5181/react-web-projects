const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const http = require('http');
const socketio = require('socket.io');

dotenv.config({ path: './config/config.env' });

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static folder (public folder)
app.use(express.static(path.join(__dirname, 'public')));

//Run when client connects
io.on('connection', socket => {

    socket.emit('message', 'Welcome to devlopment community chat room!');
    {/* difference is .emit only show message to user and
         .broadcast.email is show message to all user expect currentUser */ }

    // Broadcast when user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    //Run whens client disconnect
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });
})

if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}

const PORT = process.env.PORT || 3000;

server.listen(PORT, console.log(`Server running on port ${PORT}`.blue.bold));