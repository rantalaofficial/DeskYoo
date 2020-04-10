import openSocket from "socket.io-client"

const socket = openSocket(`${window.location.hostname}:8080`);

export default socket