const mongoose = require('mongoose')
const User = require('./models/user');

if(mongoose.connection.readyState == 0) {
    mongoose.connect('mongodb+srv://DeskYooBackend:VeryGoodPassWord54352@cluster0-n1ait.mongodb.net/MainDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).
    catch(error => handleError(error));
}

function addSocketHandles(socket) {
    //CONNECTION
    console.log(socket.id + " connected!")

    //DISCONNECTION
    socket.on('disconnect', () => {
        //WHEN DISCONNECTING, LOGOUT
        User.findOne({loggedSocketID: socket.id}, (err, user) => {
            if(err || user === null) return;

            user.loggedSocketID = null;
            user.save()
        });
    });

    socket.on("LOGIN", (data) => {
        if(!Array.isArray(data) || data.length != 2 || data[0] === undefined || data[1] === undefined) {
            socket.emit("USERERROR", "Login failed.");
            return;
        }

        isLogged(socket).then((user) => {
            if(user) {
                socket.emit("USERERROR", "Already logged in.");
                return;
            }
            User.findOne({username: data[0], passwordHash: data[1]}, (err, user) => {
                if(err || user === null) {
                    socket.emit("USERERROR", "Login failed.");
                    return;
                }
                user.loggedSocketID = socket.id;
                user.save((err) => {
                    if(err) {
                        socket.emit("USERERROR", "Login failed.");
                        return;
                    }
                    socket.emit("LOGINSUCCESS")
                });
            });
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
                score: 0,
                loggedSocketID: null,
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
        isLogged(socket).then((user) => {
            if(user) {
                socket.emit("USERDISPLAYINFO", {username: user.username, score: user.score})
                return;
            }
            socket.emit("USERERROR", "Not logged in.");
        });
    });
}

async function isLogged(socket) {
    let err, user = await User.findOne({loggedSocketID: socket.id})
    if(err || user === null) {
        return false;
    }
    return user;
}

module.exports.addSocketHandles = addSocketHandles;
module.exports.isLogged = isLogged;