import socket from './connect'

const listenError = (cb) => {
    socket.on('USERERROR', errorText => {
      cb(errorText)
    })
  }

const apiTest = () => 
  socket.on('*',(event, data) => {
    console.log(`EVENT: ${event}`)
    console.log(data)
})

const errorHelper = {
    listenError,
    apiTest
}

export default errorHelper