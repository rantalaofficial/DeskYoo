import React, {useEffect} from 'react'
import ChannelBox from '../boxes/ChannelBox'

import socket from '../../services/connect'

import ApiNames from '../../services/ApiNames'

const Channels = ({channels, st, ct, openedChannel, showNotification}) => {

  useEffect(() => {
    socket.on(ApiNames.ThreadsDisplayInfo, data => {
      //console.log(data)
      //console.log('api request: Channels')
      document.getElementById('root').style.pointerEvents = 'auto'

      return st(data)
    })

    socket.on(ApiNames.VoteThreadSuccess, () => {
      socket.emit(ApiNames.GetThreadsDisplayInfo, openedChannel)
    })

    socket.on(ApiNames.DeleteThreadSuccess, () => {
      socket.emit(ApiNames.GetThreadsDisplayInfo, openedChannel)
      showNotification('Thread deleted.', 'green')
    })
    
    return function cleanup () {
      socket.off(ApiNames.ThreadsDisplayInfo)
      socket.off(ApiNames.VoteThreadSuccess)
      socket.off(ApiNames.DeleteThreadSuccess)
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