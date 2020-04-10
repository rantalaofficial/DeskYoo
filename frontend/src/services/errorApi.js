import socket from './connect'

const listenError = (cb) => {
    socket.on('USERERROR', errorText => {
      cb(errorText)
    })
  }

const errorHelper = {
    listenError
}

export default errorHelper