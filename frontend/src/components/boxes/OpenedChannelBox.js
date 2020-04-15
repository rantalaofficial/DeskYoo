import React from 'react'

const OpenedChannelBox = ({id, name, followers, ct}) => (
    <button onClick={e => handleOpenedChannelClick(e, id, ct)} className='darkGreenBox channelInfo'>
       #<b>{name}</b><br></br>
       {followers}<span role="img" aria-label='Followers'>👤</span>
    </button>
  )
  
  const handleOpenedChannelClick = (event, id, ct) => {
    event.preventDefault()
    ct()
  }

export default OpenedChannelBox