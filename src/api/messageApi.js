const mongoose = require('mongoose')

const userApi = require('./userApi');
const utils = require('./utils');

//MESSAGE DATA STRUCTURE
const Channel = require('./models/channel');
const Thread = require('./models/thread');
const Answer = require('./models/answer');

//POPULATE DATA IF NOT FOUND
Channel.countDocuments({}, (err, count) => {
    if(err) throw err; else if(count == 0) {
        const channel1 = new Channel({text: "Main", followers: 2000});
        const channel2 = new Channel({text: "Kerttuli", followers: 69});
        const channel3 = new Channel({text: "Tunnustukset", followers: 42000});
        const channel4 = new Channel({text: "Äijjät", followers: 123});
        channel1.save()
        channel2.save()
        channel3.save()
        channel4.save()
    }
});

function addSocketHandles(socket) {
    //GETTERS
    socket.on("GETCHANNELSDISPLAYINFO", () => {
        if(!userApi.isLogged(socket)) {
            socket.emit("USERNOTLOGGED");
            return;
        }
        Channel.find({}, (err, channels) => {
            if(err) throw err;
            socket.emit("CHANNELSDISPLAYINFO", 
            channels ? channels.map(channel => channel.toJSON()) : []);
        });
    });

    socket.on("GETTHREADSDISPLAYINFO", (channelId) => {
        let userId = userApi.isLogged(socket);
        if(!userId) {
            socket.emit("USERNOTLOGGED");
            return;
        }

        if(!channelId) {
            return;
        }
        Thread.find({parentId: mongoose.Types.ObjectId(channelId)}).sort('-time').exec((err, threads) => {
            if(err) throw err;
            socket.emit("THREADSDISPLAYINFO", 
            threads && threads.length>0 ? threads.map(thread => thread.toJSON(userId)) : [{parentId: channelId}]);
        });
    });

    socket.on("GETANSWERSDISPLAYINFO", (threadId) => {
        let userId = userApi.isLogged(socket);
        if(!userId) {
            socket.emit("USERNOTLOGGED");
            return;
        }

        if(!threadId) {
            return;
        }
        Answer.find({parentId: mongoose.Types.ObjectId(threadId)}).sort('time').exec((err, answers) => {
            if(err) throw err;
            socket.emit("ANSWERSDISPLAYINFO", 
            answers && answers.length>0 ? answers.map(answer => answer.toJSON(userId)) : [{parentId: threadId}])
        });
    });

    //ADDERS
    socket.on("ADDTHREAD", (data) => {
        let userId = userApi.isLogged(socket);
        if(!userId) {
            socket.emit("USERNOTLOGGED");
            return;
        }

        if(!utils.validAPIrequest(data, ["string", "string", "string"])) {
            socket.emit("USERERROR", "Invalid thread data.");
            return;
        }

        let text = data[0];
        let location = data[1]
        let parentId = data[2];

        const thread = Thread({
            text: text,
            votes: 0,
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

    socket.on("VOTETHREAD", (data) => {
        let userId = userApi.isLogged(socket);
        if(!userId) {
            socket.emit("USERNOTLOGGED");
            return;
        }

        if(!utils.validAPIrequest(data, ["string", "boolean"])) {
            socket.emit("USERERROR", "Invalid vote data.");
            return;
        }

        let threadId = data[0];
        let positiveVote = data[1];

        Thread.findOne({_id: threadId}, (err, thread) => {
            if(err || thread === undefined || thread === null) {
                socket.emit("USERERROR", "Vote failed.");
                return;
            }
            if(userId in thread.voteIds) {
                socket.emit("USERERROR", "User already voted.");
                return;
            }

            (positiveVote) ? thread.votes += 1 : thread.votes -= 1;
            thread.voteIds.push(userId)

            thread.save((err) => {
                if(err) {
                    socket.emit("USERERROR", "Vote failed to save.");
                    return;
                }
                userApi.changeScore(userId, 1);
                (positiveVote) ? userApi.changeScore(thread.authorId, 2) : userApi.changeScore(thread.authorId, -1);
                socket.emit("VOTETHREADSUCCESS")
            });
        }); 
    });

    socket.on("ADDANSWER", (data) => {
        let userId = userApi.isLogged(socket);
        if(!userId) {
            socket.emit("USERNOTLOGGED");
            return;
        }
        
        if(!utils.validAPIrequest(data, ["string", "string", "string"])) {
            socket.emit("USERERROR", "Invalid answer data.");
            return;
        }

        let text = data[0];
        let location = data[1]
        let parentId = data[2];

        const answer = Answer({
            text: text,
            votes: 0,
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

    socket.on("VOTEANSWER", (data) => {
        let userId = userApi.isLogged(socket);
        if(!userId) {
            socket.emit("USERNOTLOGGED");
            return;
        }

        if(!utils.validAPIrequest(data, ["string", "boolean"])) {
            socket.emit("USERERROR", "Invalid vote data.");
            return;
        }

        let answerId = data[0];
        let positiveVote = data[1];

        Answer.findOne({_id: answerId}, (err, answer) => {
            if(err || answer === undefined || answer === null) {
                socket.emit("USERERROR", "Vote failed.");
                return;
            }
            if(userId in answer.voteIds) {
                socket.emit("USERERROR", "User already voted.");
                return;
            }

            (positiveVote) ? answer.votes += 1 : answer.votes -= 1;
            answer.voteIds.push(userId)

            answer.save((err) => {
                if(err) {
                    socket.emit("USERERROR", "Vote failed to save.");
                    return;
                }

                userApi.changeScore(userId, 1);
                (positiveVote) ? userApi.changeScore(answer.authorId, 2) : userApi.changeScore(answer.authorId, -1);
                socket.emit("VOTEANSWERSUCCESS")
            });
        }); 
    });
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports.addSocketHandles = addSocketHandles;