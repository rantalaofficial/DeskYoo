import React from 'react'
import apiHelper from '../../services/api'

const ChannelBox = ({id, name, followers, st}) => (
    <button onClick={e => handleChannelClick(e, id, st)} className='greenBox channelInfo'>
       #<b>{name}</b><br></br>
       <span>{followers} 👤</span> 
    </button>
  )
  
  const handleChannelClick = (event, id, st) => {
    event.preventDefault()
    console.log(id)
    apiHelper.getThreadDisplayInfo(id, (data) => {
      console.log(data)
      data.map(thread => {
        thread.channelId=id
      })
      console.log(data)
      st(data)
    })
  }

export default ChannelBox