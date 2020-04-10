const common = require('./common');

class UserData {
    constructor() {
        this.users = {}
    }

    userExists(userID) {
        if(this.users[userID] == undefined) {
            return false;
        }
        return true;
    }

    isValidAuth(username, passwordHash) {
        if(!/^\w+$/.test(username) || username.length < 5 || passwordHash == undefined) {
            return false;
        }
        return true;
    }

    register(username, passwordHash) {
        if(!this.isValidAuth(username, passwordHash)) {
            return false;
        }

        let userID;
        do {
            //CHECK THAT ID DOESNT ALREADY EXIST AND MAKES NEW ONE IF EXISTS
            userID = common.makeID(10)
        } while(this.users[userID] != undefined)
        
        this.users[userID] = {username: username, passwordHash: passwordHash, score: 0, loggedSocketID: false};

        return userID
    }

    login(username, passwordHash, socketID) {
        if(!this.isValidAuth(username, passwordHash) || socketID == undefined) {
            return false;
        }

        for(let id of Object.keys(this.users)) {
            if(this.users[id].username === username && this.users[id].passwordHash === passwordHash) {
                this.users[id].loggedSocketID = socketID;
                return id;
            }
        }
        return false;
    }

    logout(socketID) {
        let userID = this.getUserIDWithSocketID(socketID)
        if(userID) {
            this.users[userID].loggedSocketID = false;
            return userID;
        }
        return false;
    }

    isLogged(socketID) {
        let userID = this.getUserIDWithSocketID(socketID)
        if(!userID || this.users[userID].loggedSocketID == false) {
            return false
        }
        return true;
    }

    //GETTERS
    getUserIDWithSocketID(socketID) {
        if(socketID == undefined) {
            return false;
        }

        for(let id of Object.keys(this.users)) {
            if(this.users[id].loggedSocketID == socketID) {
                return id;
            }
        }
        return false;  
    }
}

const userData = new UserData();

userData.register("Matias", "11111111")
userData.register("Aapooo", "22222222")
userData.register("Tappaja", "3333333")

module.exports = userData;