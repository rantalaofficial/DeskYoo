import openSocket from "socket.io-client"

const socket = openSocket(`${window.location.hostname}:8080`)

let onevent = socket.onevent;
socket.onevent = function (packet) {
  var args = packet.data || [];
  onevent.call (this, packet);    // original call
  packet.data = ["*"].concat(args);
  onevent.call(this, packet);      // additional call to catch-all
};


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