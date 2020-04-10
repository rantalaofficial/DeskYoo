import socket from './connect'

//LOGIN

const login = (user, cb) => {
  socket.emit('LOGIN', user)
  socket.on('LOGINSUCCESS', userId => {
    cb(userId)
  })
}

const getUserDisplayInfo = (cb) => {
  socket.emit('GETUSERDISPLAYINFO')
  socket.on('USERDISPLAYINFO', data => {
    console.log(data)
    cb(data)
  })
}

const userHelper = {
    login,
    getUserDisplayInfo
}

export default userHelper