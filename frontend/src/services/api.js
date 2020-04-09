import openSocket from "socket.io-client"

const socket = openSocket(`${window.location.hostname}:8080`);

const getChannelDisplayInfo = (cb) => {
  socket.emit('GETCHANNELSDISPLAYINFO')
  socket.on('CHANNELDISPLAYINFO', data => {
    cb(data)
  })
}

export {getChannelDisplayInfo}