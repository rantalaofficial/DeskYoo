const express = require('express');
const socket = require('socket.io');

//APP SETUP
const serverPort = 8080;
const app = express();
const server = app.listen(serverPort, () => {
	console.log("Server started on port " + serverPort)
});
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static('public'));
const io = socket(server);

const userApi = require('./api/messageApi');
const messageApi = require('./api/messageApi');


io.on('connection', (socket) => {
    userApi.addSocketHandles(socket)
    //messageApi.addSocketHandles(socket)
});







