import React from 'react'

import socket from '../../services/connect'

import ApiNames from '../../services/ApiNames'

const ChannelBox = ({id, name, followers, ct}) => {

  const handleClick = (event) => {
    ct ? handleOpenedChannelClick(event, ct) : handleChannelClick(event, id)
  }

  return (
    <div>
      <button onClick={handleClick} className={ct ? 'darkGreenBox channelInfo' : 'greenBox channelInfo'}>
        #<b>{name}</b><br></br>
        {followers}<span role="img" aria-label='Followers'>👤</span>
      </button>
    </div>
  )
}
  
const handleChannelClick = (event, id) => {
  //console.log('Channel click')
  event.preventDefault()
  document.getElementById('root').style.pointerEvents = 'none'

  socket.emit(ApiNames.GetThreadsDisplayInfo, id)
}

const handleOpenedChannelClick = (event, ct) => {
  event.preventDefault()
  ct()
}

export default ChannelBox