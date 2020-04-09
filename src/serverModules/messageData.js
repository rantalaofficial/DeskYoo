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
        if(this.channelExists(channelID) == false || threadID < 0 || threadID > this.channels[channelID].msgThreads.length) {
            return false;
        }
        return true;
    }

    answerExists(channelID, threadID, answerID) {
        if(this.threadExists(channelID, threadID) == false || answerID < 0 || answerID > this.channels[channelID].msgThreads[threadID].answers.length) {
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

    likeThread(channelID, threadID, likes = true) {
        if(!this.threadExists(channelID, threadID)) {
            return false;
        }

        if(likes) {
            this.channels[channelID].msgThreads[threadID].likes++;
        } else {
            this.channels[channelID].msgThreads[threadID].likes--;
        }
        
    }

    likeAnswer(channelID, threadID, answerID, likes = true) {
        if(!this.answerExists(channelID, threadID, answerID)) {
            return false;
        }

        if(likes) {
            this.channels[channelID].msgThreads[threadID].answers[answerID].likes++;
        } else {
            this.channels[channelID].msgThreads[threadID].answers[answerID].likes--;
        }
        
    }

    //GETTERS
    getChannelsDisplayInfo() {
        return this.channels.map((channel, i) => ({name: this.channels[i].name, followers: this.channels[i].followers}))
    }

    getThreadsDisplayInfo(channelID) {
        if(!this.channelExists(channelID)) {
            return false;
        }

        let channel = this.channels[channelID]

        if(!channel){
            return false;
        }

        return channel.msgThreads.map(thread => ({text: thread.text, likes: thread.likes, location: thread.location}))
    }

    getAnswersDisplayInfo(channelID, threadID) {
        if(!this.threadExists(channelID, threadID)) {
            return false;
        }

        let answersDisplayInfo = []

        let thread = this.channels[channelID].msgThreads[threadID]

        for(let i = 0; i < thread.answers.length; i++) {
            answersDisplayInfo.push({text: thread.answers[i].text, likes: thread.answers[i].likes, location: thread.answers[i].location})
        }

        return answersDisplayInfo;
    }
}

const msgData = new MessageData(["Main", "Kerttuli", "tunnustukset"])


module.exports = msgData;