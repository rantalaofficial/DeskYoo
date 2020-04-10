import socket from './connect'

//LOGIN

const login = (user, cb) => {
    socket.emit('LOGIN', user)
    socket.on('LOGINSTATUS', user => {
      cb(user)
    })
  }

const userHelper = {
    login
}

export default userHelper