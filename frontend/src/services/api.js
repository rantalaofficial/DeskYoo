import openSocket from "socket.io-client"

const socket = openSocket(`${window.location.hostname}:8080`);

const getChannelDisplayInfo = (cb) => {
  socket.emit('GETCHANNELSDISPLAYINFO')
  socket.on('CHANNELDISPLAYINFO', data => {
    cb(data)
  })
}

const getThreadDisplayInfo = (id, cb) => {
  socket.emit('GETTHREADSDISPLAYINFO', id)
  socket.on('THREADSDISPLAYINFO', data => {
    console.log(data)
    cb(data)
  })
}

const apiHelper = {
  getChannelDisplayInfo,
  getThreadDisplayInfo
}

export default apiHelper