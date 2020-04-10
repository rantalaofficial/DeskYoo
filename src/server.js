const express = require('express');
const socket = require('socket.io');

//SERVER MODULES
const msgData = require('./serverModules/messageData');
const userData = require('./serverModules/userData');

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
    //CONNECTION
    console.log(socket.id + " connected!")

    //DISCONNECTION
    socket.on('disconnect', () => {
        //WHEN DISCONNECTING, LOGOUT
        console.log("Logout: " + userData.logout(socket.id))
        console.log(userData.users)
    });

    //LOGIN API
    socket.on("LOGIN", (data) => {
        let userID = userData.login(data[0], data[1], socket.id)
        if(!userID) {
            socket.emit("USERERROR", "Incorrect username or password.");
            return;
        }

        socket.emit("LOGINSUCCESS", userID)
    });
    //REGISTER API
    socket.on("REGISTER", (data) => {
        let userID = userData.register(data[0], data[1])
        if(!userID) {
            socket.emit("USERERROR", "Register failed. Username might be already in use");
            return;
        }

        socket.emit("REGISTERSUCCESS", userID)
    })

    //USER GETTER API
    socket.on("GETUSERDISPLAYINFO", () => {
        if(!userData.isLogged(socket.id)) {
            socket.emit("USERERROR", "Not logged in");
            return;
        }

        socket.emit("USERDISPLAYINFO", userData.getUserDisplayInfo(socket.id))
    });

    //MESSAGE GETTER API
    socket.on("GETCHANNELSDISPLAYINFO", () => {
        if(!userData.isLogged(socket.id)) {
            socket.emit("USERERROR", "Not logged in");
            return;
        }
        
        socket.emit("CHANNELDISPLAYINFO", msgData.getChannelsDisplayInfo());
    });

    socket.on("GETTHREADSDISPLAYINFO", (channelID) => {
        if(!userData.isLogged(socket.id)) {
            socket.emit("USERERROR", "Not logged in");
            return;
        }

        console.log(`Channel id ${channelID} ${typeof channelID}`)
        let threadsDisplayInfo = msgData.getThreadsDisplayInfo(channelID);
        if(!threadsDisplayInfo) {
            console.log("ThreadDisplayInfo Request is invalid!")
            return;
        }

        socket.emit("THREADSDISPLAYINFO", threadsDisplayInfo);
    });

    socket.on("GETANSWERSDISPLAYINFO", (IDs) => {
        if(!userData.isLogged(socket.id)) {
            socket.emit("USERERROR", "Not logged in");
            return;
        }

        if(!Array.isArray(IDs) || IDs.length != 2 || !msgData.threadExists(IDs[0], IDs[1])) {
            console.log("AnswersDisplayInfo Request is invalid!")
            return;
        }

        socket.emit("ANSWERSDISPLAYINFO", msgData.getAnswersDisplayInfo(IDs[0], IDs[1]))
    });

});







