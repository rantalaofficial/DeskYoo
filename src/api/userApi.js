const mongoose = require('mongoose')
const User = require('./models/user');

mongoose.connect('mongodb+srv://DeskYooBackend:VeryGoodPassWord54352@cluster0-n1ait.mongodb.net/UserDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).
    catch(error => handleError(error));

function addSocketHandles(socket) {
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
        //let userID = userData.login(data[0], data[1], socket.id)
        return;
        

        //socket.emit("LOGINSUCCESS")
    });
    //REGISTER API
    socket.on("REGISTER", (data) => {
        if(!Array.isArray(data) || data.length != 2 || data[0].length < 5 || data[0] == undefined) {
            socket.emit("USERERROR", "Register failed.");
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
            } else {
                socket.emit("REGISTERSUCCESS")
            }
        });
    })

    //USER GETTER API
    socket.on("GETUSERDISPLAYINFO", () => {
        
    });
}