const mongoose = require('mongoose')
const User = require('./models/user');

mongoose.connect('mongodb+srv://DeskYooBackend:VeryGoodPassWord54352@cluster0-n1ait.mongodb.net/MessageDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).
    catch(error => handleError(error));

function addSocketHandles(socket) {


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

}

module.exports.addSocketHandles = addSocketHandles;