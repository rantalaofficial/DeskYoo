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
    }
});

function addSocketHandles(socket) {
    //GETTERS
    socket.on("GETCHANNELSDISPLAYINFO", () => {
        if(!userApi.isLogged(socket)) {
            socket.emit("USERERROR", "Not logged in");
            return;
        }
        Channel.find({}, (err, channels) => {
            if(err) throw err;
            socket.emit("CHANNELSDISPLAYINFO", 
            channels ? channels.map(channel => channel.toJSON()) : []);
        });
    });

    socket.on("GETTHREADSDISPLAYINFO", (channelId) => {
        if(!channelId || channelId.length === 0) {
            return;
        }
        if(!userApi.isLogged(socket)) {
            socket.emit("USERERROR", "Not logged in");
            return;
        }
        Thread.find({parentId: mongoose.Types.ObjectId(channelId)}).sort('-time').exec((err, threads) => {
            if(err) throw err;
            socket.emit("THREADSDISPLAYINFO", 
            threads ? threads.map(thread => thread.toJSON()) : []);
        });
    });

    socket.on("GETANSWERSDISPLAYINFO", (threadId) => {
        if(!userApi.isLogged(socket)) {
            socket.emit("USERERROR", "Not logged in");
            return;
        }

        Thread.find({parentId: mongoose.Types.ObjectId(threadId)}).sort('-time').exec((err, answers) => {
            if(err) throw err;
            socket.emit("ANSWERSDISPLAYINFO", 
            answers ? answers.map(answer => answer.toJSON()) : [])
        });
    });

    //ADDERS
    socket.on("ADDTHREAD", (data) => {
        let userId = userApi.isLogged(socket);
        if(!userId) {
            socket.emit("USERERROR", "Not logged in");
            return;
        }

        if(!Array.isArray(data) || data.length != 3 || data[0].length === 0 || data[1].length === 0 || data[2].length === 0) {
            socket.emit("USERERROR", "Invalid thread data.");
            return;
        }
        
        let text = data[0];
        let location = data[1]
        let parentId = data[2];

        const thread = Thread({
            text: text,
            likes: 0,
            location: location,
            color: randomIntFromInterval(0, 4),
            time: new Date().getTime(),
            author: userId,
            parentId: parentId,
        });

        thread.save((err) => {
            if(err) {
                socket.emit("USERERROR", "Add thread failed to save.");
                return;
            }
            userApi.changeScore(userId, 10)
            socket.emit("ADDTHREADSUCCESS")
        });
    });

    socket.on("ADDANSWER", (data) => {
        let userId = userApi.isLogged(socket);
        if(!userId) {
            socket.emit("USERERROR", "Not logged in");
            return;
        }

        if(!Array.isArray(data) || data.length != 3 || data[0].length === 0 || data[1].length === 0 || data[2].length === 0) {
            socket.emit("USERERROR", "Invalid answer data.");
            return;
        }
        
        let text = data[0];
        let location = data[1]
        let parentId = data[2];

        const answer = Answer({
            text: text,
            likes: 0,
            location: location,
            time: new Date().getTime(),
            author: userId,
            parentId: parentId,
        });

        answer.save((err) => {
            if(err) {
                socket.emit("USERERROR", "Add answer failed to save.");
                return;
            }

            userApi.changeScore(userId, 10)
            socket.emit("ADDANSWERSUCCESS")
        });
    });
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports.addSocketHandles = addSocketHandles;