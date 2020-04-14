const mongoose = require('mongoose')
const User = require('./models/user');

if(mongoose.connection.readyState == 0) {
    mongoose.connect('mongodb+srv://DeskYooBackend:VeryGoodPassWord54352@cluster0-n1ait.mongodb.net/MainDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).
    catch(error => handleError(error));
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

    socket.on("LOGIN", (data) => {
        if(!Array.isArray(data) || data.length != 2 || data[0] === undefined || data[1] === undefined) {
            socket.emit("USERERROR", "Login failed.");
            return;
        }

        if(isLogged(socket)) {
            socket.emit("USERERROR", "Already logged in.");
            return;
        }

        User.findOne({username: data[0], passwordHash: data[1]}, (err, user) => {
            if(err || user === null) {
                socket.emit("USERERROR", "Login failed.");
                return;
            }
            loggedUsers[socket.id] = user._id;
            socket.emit("LOGINSUCCESS")
        });
    });

    socket.on("REGISTER", (data) => {
        if(!Array.isArray(data) || data.length != 2 || data[0].length < 5 || data[1] === undefined) {
            socket.emit("USERERROR", "Register failed.");
            return;
        }
        //CHECKS THAT NO OTHER USER EXISTS WITH SAME NAME
        User.exists({username: data[0]}, (err, result) => {
            if(err) {
                socket.emit("USERERROR", "Register failed.");
                return;
            } else if(result == true) {
                socket.emit("USERERROR", "Username already in use.")
                return;
            }

            const user = new User({
                username: data[0],
                passwordHash: data[1],
                score: 100,
            })
    
            user.save((err) => {
                if(err) {
                    socket.emit("USERERROR", "Register failed.");
                    return;
                }
                socket.emit("REGISTERSUCCESS")
            });
        });
    })

    //USER GETTER API
    socket.on("GETUSERDISPLAYINFO", () => {
        let userId = isLogged(socket)
        if(!userId) {
            socket.emit("USERERROR", "Not logged in.");
            return;
        }
        User.findOne({_id: userId}, (err, user) => {
            socket.emit("USERDISPLAYINFO", {username: user.username, score: user.score})
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