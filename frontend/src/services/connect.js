import openSocket from "socket.io-client"

const socket = openSocket(`${window.location.hostname}:8080`)

const sendRequest = (event, data) => {
    if(event) {
        socket.emit(event, data)
    }
    else{
        console.log('Event must be specified')
    }
}

window.sendRequest=sendRequest
export default socket