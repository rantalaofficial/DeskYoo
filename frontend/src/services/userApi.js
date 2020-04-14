import socket from './connect'

//LOGIN

const login = async (user, cb) => {
  socket.emit('LOGIN', user)
  await socket.on('LOGINSUCCESS', async () => {
    cb(true)
  })
}

const register = async (user) => {
  socket.emit('REGISTER', user)
  await socket.on('REGISTERSUCCESS', () => {
    return true
  })
  return false
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
    register,
    getUserDisplayInfo
}

export default userHelper