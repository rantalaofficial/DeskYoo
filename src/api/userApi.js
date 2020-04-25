const mongoose = require('mongoose')
const User = require('./models/user');

const ApiNames = require('./ApiNames');

const config = require('../util/config')

if(mongoose.connection.readyState == 0) {
    mongoose.connect(config.DBADDRESS, {useNewUrlParser: true, useUnifiedTopology: true}).then(
        () => {
            console.log("Database connection state: " + mongoose.connection.readyState);
        },
        (err) => {
            console.log("Database error:" + err)
        }
    )
}

//KEEPS TRACK OF LOGGED USERS {key: socket.id, value user_id}: 
let loggedUsers = {};

function addSocketHandles(socket) {
    //CONNECTION
    console.log(socket.id + " connected!")

    //DISCONNECTION
    socket.on('disconnect', () => {
        //WHEN DISCONNECTING, LOGOUT
        if(loggedUsers[socket.id] != undefined) {
            delete loggedUsers[socket.id]
        }
    });

    socket.on(ApiNames.Login, (data) => {
        if(!Array.isArray(data) || data.length != 2 || data[0] === undefined || data[1] === undefined) {
            socket.emit(ApiNames.UserError, "Login failed.");
            return;
        }

        if(isLogged(socket)) {
            socket.emit(ApiNames.UserError, "Already logged in.");
            return;
        }

        User.findOne({username: data[0], passwordHash: data[1]}, (err, user) => {
            if(err || user === null) {
                socket.emit(ApiNames.UserError, "Login failed.");
                return;
            }
            loggedUsers[socket.id] = user._id;
            socket.emit(ApiNames.LoginSuccess)
        });
    });

    //LOGOUT
    socket.on(ApiNames.Logout, () => {
        if(loggedUsers[socket.id] != undefined) {
            delete loggedUsers[socket.id]
        }
    });

    socket.on(ApiNames.Register, (data) => {
        if(!Array.isArray(data) || data.length != 2 || data[0].length < 5 || data[1] === undefined) {
            socket.emit(ApiNames.UserError, "Register failed.");
            return;
        }
        //CHECKS THAT NO OTHER USER EXISTS WITH SAME NAME
        User.exists({username: data[0]}, (err, result) => {
            if(err) {
                socket.emit(ApiNames.UserError, "Register failed.");
                return;
            } else if(result == true) {
                socket.emit(ApiNames.UserError, "Username already in use.")
                return;
            }

            const user = new User({
                username: data[0],
                passwordHash: data[1],
                score: 100,
            })
    
            user.save((err) => {
                if(err) {
                    socket.emit(ApiNames.UserError, "Register failed.");
                    return;
                }
                socket.emit(ApiNames.RegisterSuccess)
            });
        });
    })

    //USER GETTER API
    socket.on(ApiNames.GetUserDisplayInfo, () => {
        let userId = isLogged(socket)
        if(!userId) {
            socket.emit(ApiNames.UserNotLogged);
            return;
        }
        User.findOne({_id: userId}, (err, user) => {
            socket.emit(ApiNames.UserDisplayInfo, {username: user.username, score: user.score})
        })
    });
}

function changeScore(userId, ammount) {
    User.findOne({_id: userId}, (err, user) => {
        if(err || user === undefined || user === null) {
            return;
        }
        user.score += ammount;
        user.save()
    });   
}

function isLogged(socket) {
    if(socket.id in loggedUsers) {
        return loggedUsers[socket.id];
    }
    return false;
}

function getLoggedUsers() {
    return loggedUsers;
}

module.exports.addSocketHandles = addSocketHandles;
module.exports.isLogged = isLogged;
module.exports.getLoggedUsers = getLoggedUsers;
module.exports.changeScore = changeScore;