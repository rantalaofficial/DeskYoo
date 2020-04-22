import React, {useEffect} from 'react'
import ChannelBox from '../boxes/ChannelBox'

import socket from '../../services/connect'

const Channels = ({channels, st, ct, openedChannel, showNotification}) => {

  useEffect(() => {
    socket.on('THREADSDISPLAYINFO', data => {
      //console.log(data)
      //console.log('api request: Channels')
      document.getElementById('root').style.pointerEvents = 'auto'

      return st(data)
    })

    socket.on('VOTETHREADSUCCESS', () => {
      socket.emit('GETTHREADSDISPLAYINFO', openedChannel)
    })

    socket.on('DELETETHREADSUCCESS', () => {
      socket.emit('GETTHREADSDISPLAYINFO', openedChannel)
      showNotification('Deleting a thread successful', 'green')
    })
    
    return function cleanup () {
      socket.off('THREADSDISPLAYINFO')
      socket.off('VOTETHREADSUCCESS')
      socket.off('DELETETHREADSUCCESS')
    }
  }, [st, openedChannel])

  return(
    channels 
    ? 
    <div>
      {channels.map((channel) =>
        <ChannelBox key={channel.id}
        id={channel.id} 
        name={channel.text}
        followers={channel.followers}
        ct={channel.id!==openedChannel ? null : ct}
        />
      )}
    </div>
    :
    null
  )
}

export default Channels