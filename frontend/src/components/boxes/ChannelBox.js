import React from 'react'

import socket from '../../services/connect'

const ChannelBox = ({id, name, followers}) => (
    <button onClick={e => handleChannelClick(e, id)} className='greenBox channelInfo'>
       #<b>{name}</b><br></br>
       {followers}<span role="img" aria-label='Followers'>👤</span>
    </button>
  )
  
  const handleChannelClick = (event, id) => {
    //console.log('Channel click')
    event.preventDefault()
    socket.emit('GETTHREADSDISPLAYINFO', id)
  }

export default ChannelBox