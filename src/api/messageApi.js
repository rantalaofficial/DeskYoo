const mongoose = require('mongoose')

const userApi = require('./userApi');

//MESSAGE DATA STRUCTURE
const Channel = require('./models/channel');
const Thread = require('./models/thread');
const Answer = require('./models/answer');

//POPULATE DATA IF NOT FOUND
Channel.countDocuments({}, (err, count) => {
    if(err) throw err; else if(count == 0) {
        const main = new Channel({text: "Main", followers: 2000});
        const kerttuli = new Channel({text: "Kerttuli", followers: 69});
        main.save()
        kerttuli.save()

        const kysely = new Thread({text: "Mitä saitte matikan alustavista?", likes: 3, channelId: kerttuli._id})
        kysely.save()

        const vastaus = new Answer({text: "105 pistettä, koska olen hikke xd", likes: 50, threadId: kysely._id})
        vastaus.save()
    }
});

function addSocketHandles(socket) {
    socket.on("GETCHANNELSDISPLAYINFO", () => {
        userApi.isLogged(socket).then((user) => {
            if(!user) {
                socket.emit("USERERROR", "Not logged in");
                return;
            }
            Channel.find({}, (err, channels) => {
                if(err) throw err;
                socket.emit("CHANNELSDISPLAYINFO", channels);
            });
        });
    });

    socket.on("GETTHREADSDISPLAYINFO", (channelId) => {
        if(channelId === undefined || channelId.length === 0) {
            return;
        }
        userApi.isLogged(socket).then((user) => {
            if(!user) {
                socket.emit("USERERROR", "Not logged in");
                return;
            }
            Thread.find({channelId: channelId}, (err, threads) => {
                if(err) throw err;
                socket.emit("CHANNELSDISPLAYINFO", threads);
            });
        });
    });

    socket.on("GETANSWERSDISPLAYINFO", (data) => {
        if(data == undefined || data.length != 2 || data[0] === undefined || data[1] === undefined) {
            return;
        }
        userApi.isLogged(socket).then((user) => {
            if(!user) {
                socket.emit("USERERROR", "Not logged in");
                return;
            }
            
            let channelId = data[0];
            let threadId = data[1];

            

        });

        
        /*
        if(!userData.isLogged(socket.id)) {
            socket.emit("USERERROR", "Not logged in");
            return;
        }

        if(!Array.isArray(IDs) || IDs.length != 2 || !msgData.threadExists(IDs[0], IDs[1])) {
            console.log("AnswersDisplayInfo Request is invalid!")
            return;
        }

        socket.emit("ANSWERSDISPLAYINFO", msgData.getAnswersDisplayInfo(IDs[0], IDs[1]))
        */
    });

}

module.exports.addSocketHandles = addSocketHandles;