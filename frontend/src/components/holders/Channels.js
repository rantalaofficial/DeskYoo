import React, {useEffect} from 'react'
import ChannelBox from '../boxes/ChannelBox'

import socket from '../../services/connect'

const Channels = ({channels, st}) => {

  useEffect(() => {
    socket.on('THREADSDISPLAYINFO', data => {
      //console.log(data)
      //console.log('api request: Channels')
      document.getElementById('root').style.pointerEvents = 'auto'

      return st(data)
    })
    
    return function cleanup () {
      socket.off('THREADSDISPLAYINFO')
    }
  }, [])

  if(channels){
    return(
      <div>
        {channels.map((channel) =>
          <ChannelBox key={channel.id}
          id={channel.id} 
          name={channel.text} 
          followers={channel.followers}
          />
        )}
      </div>
    )
  }
  else{
    return(
      <div>

      </div>
    )
  }
}

export default Channels