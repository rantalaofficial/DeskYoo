class MessageData {
    constructor(channelNames) {
        this.channels = [];

        for(let i = 0; i < channelNames.length; i++) {
            this.channels.push({name: channelNames[i], followers: 0, msgThreads: []})
        }
    }

    channelExists(channelID) {
        if(channelID < 0 || channelID > this.channels.length) {
            return false;
        }
        return true;
    }

    threadExists(channelID, threadID) {
        if(channelExists(channelID) == false || threadID < 0 || threadID > this.channels[channelID].msgThreads.length) {
            return false;
        }
        return true;
    }

    addChannel(channelName) {
        //CHECKS THAT CHANNEL DOESN'T ALREADY EXIST
        for(let i = 0; i < this.channels.length; i++) {
            if(this.channels[i].name == channelName) {
                return false;
            }
        }

        this.channels.push({name: channelName, followers: 0, msgThreads: []})
    }

    addThread(channelID, text, location) {
        if(!this.channelExists(channelID)) {
            return false;
        }

        this.channels[channelID].msgThreads.push({text: text, likes: 0, location: location, answers: []})
    }

    addAnswer(channelID, threadID, text, location) {
        if(!this.threadExists(channelID, threadID)) {
            return false;
        }

        this.channels[channelID].msgThreads[threadID].answers.push({text: text, likes: 0, location: location})
    }
}

const msgData = new MessageData(["Main", "Kerttuli", "tunnustukset"])



module.exports = msgData;