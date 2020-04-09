const express = require('express');
const socket = require('socket.io');

//SERVER MODULES
const msgData = require('./serverModules/messageData');

msgData.addThread(0, "Mitä sait matikan alustavista", "Turku")

msgData.addAnswer(0, 0, "Sain täydet!!", "Turku")

console.log(msgData.getAnswersDisplayInfo(0, 0))

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


io.on('connection', (socket) => {
    console.log(socket.id + " connected!")

    socket.on('disconnect', () => {
        //DISCONNECT
        console.log("User disconnected!")
    });

    socket.on("GETCHANNELSDISPLAYINFO", () => {
        socket.emit("CHANNELDISPLAYINFO", msgData.getChannelsDisplayInfo());

        console.log("AAPO STOP THIS SHITT")
    });

    socket.on("GETTHREADSDISPLAYINFO", (channelID) => {
        console.log(`Channel id ${channelID} ${typeof channelID}`)
        let threadsDisplayInfo = msgData.getThreadsDisplayInfo(channelID);
        if(!threadsDisplayInfo) {
            console.log("ThreadDisplayInfo Request is invalid!")
            return;
        }

        socket.emit("THREADSDISPLAYINFO", threadsDisplayInfo);
    });

    socket.on("GETANSWERSDISPLAYINFO", (IDs) => {
        if(!Array.isArray(IDs) || IDs.length != 2 || !msgData.threadExists(IDs[0], IDs[1])) {
            console.log("AnswersDisplayInfo Request is invalid!")
            return;
        }

        socket.emit("ANSWERSDISPLAYINFO", msgData.getAnswersDisplayInfo(IDs[0], IDs[1]))
    });

});







