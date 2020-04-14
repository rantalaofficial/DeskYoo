import socket from './connect'

//DATA GETTERS

const getChannelDisplayInfo = (cb) => {
  socket.emit('GETCHANNELSDISPLAYINFO')
  socket.on('CHANNELSDISPLAYINFO', data => {
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

const getAnswersDisplayInfo = (id, cb) => {
  socket.emit('GETANSWERSDISPLAYINFO', id)
  socket.on('ANSWERSDISPLAYINFO', data => {
    console.log(data)
    cb(data)
  })
}

//DATA ADDERS

const addThread = (message, openedChannel, st) => {
  socket.emit('ADDTHREAD', message)
  socket.on('ADDTHREADSUCCESS', () => 
  getThreadDisplayInfo(openedChannel, data => {
    st(data)
  }))
}

const dataHelper = {
  getChannelDisplayInfo,
  getThreadDisplayInfo,
  getAnswersDisplayInfo,
  addThread
}

export default dataHelper