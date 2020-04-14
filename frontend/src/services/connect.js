import openSocket from "socket.io-client"

const socket = openSocket(`${window.location.hostname}:8080`)

/*
let onevent = socket.onevent
socket.onevent = (packet) => {
    let args = packet.data || []
    onevent.call(socket, packet)
    packet.data = ['*'].concat(args)
    onevent.call(socket, packet);   
}

*/

const sendRequest = (event, data) => {
    if(event) {
        socket.emit(event, data)
    }
    else{
        console.log('Event must be specified')
    }
}

localStorage.debug = 'engine.io-client:socket'

window.sendRequest=sendRequest
    
export default socket