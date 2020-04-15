import React, {useEffect} from 'react'
import ChannelBox from '../boxes/ChannelBox'
import OpenedChannelBox from '../boxes/OpenedChannelBox'

import socket from '../../services/connect'

const OpenedChannels = ({channels, st, ct, openedChannel}) => {

  useEffect(() => {
    socket.on('THREADSDISPLAYINFO', data => {
      //console.log(data)
      //console.log('api request: Opened Channels')
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
        {channels.map((channel) => channel.id!==openedChannel ?
          <ChannelBox key={channel.id}
          id={channel.id} 
          name={channel.text} 
          followers={channel.followers}
          />
          :
          <OpenedChannelBox key={channel.id}
          id={channel.id} 
          name={channel.text} 
          followers={channel.followers}
          ct={ct}
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

export default OpenedChannels