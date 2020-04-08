const express = require('express');
const socket = require('socket.io');

//APP SETUP
let serverPort = 8080;
let app = express();
let server = app.listen(serverPort, function() {
	console.log("Server started on port " + serverPort)
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static('public'));
let io = socket(server);


io.on('connection', (socket) => {
    console.log(socket.id + " connected!")

    socket.on('disconnect', () => {
        //DISCONNECT
        console.log("User disconnected!")
    });

    socket.on('EXAMPLE', (data) => {
        //EXAMPLE HANDLER
        console.log("Example!")
    });
});
