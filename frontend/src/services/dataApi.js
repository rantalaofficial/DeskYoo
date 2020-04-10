import socket from './connect'

//DATA GETTERS

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

const getAnswersDisplayInfo = (channelId, threadId, cb) => {
  socket.emit('GETANSWERSDISPLAYINFO', [channelId, threadId])
  socket.on('ANSWERSDISPLAYINFO', data => {
    console.log(data)
    cb(data)
  })
}

const dataHelper = {
  getChannelDisplayInfo,
  getThreadDisplayInfo,
  getAnswersDisplayInfo
}

export default dataHelper