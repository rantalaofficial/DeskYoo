import React from 'react'

const OpenedChannelBox = ({id, name, followers, ct}) => (
    <button onClick={e => handleOpenedChannelClick(e, id, ct)} className='redBox channelInfo'>
       #<b>{name}</b><br></br>
       <span>{followers} 👤</span> 
    </button>
  )
  
  const handleOpenedChannelClick = (event, id, ct) => {
    event.preventDefault()
    console.log(id)
    ct()
  }

export default OpenedChannelBox