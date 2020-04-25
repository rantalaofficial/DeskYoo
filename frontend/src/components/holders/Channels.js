import React, {useEffect} from 'react'
import ChannelBox from '../boxes/ChannelBox'

import socket from '../../services/connect'

import { useSelector, useDispatch } from 'react-redux'

import { setNotification } from '../../reducers/notificationReducer'

import { setThreads, closeThreads } from '../../reducers/dataReducer'

import ApiNames from '../../services/ApiNames'

const Channels = (props) => {

  const channels = useSelector(state => state.dataReducer.channels)

  const openedChannel = useSelector(state => state.dataReducer.openedChannel)

  const dispatch = useDispatch()

  useEffect(() => {
    socket.on(ApiNames.ThreadsDisplayInfo, data => {
      //console.log(data)
      //console.log('api request: Channels')
      document.getElementById('root').style.pointerEvents = 'auto'

      return dispatch(setThreads(data))
    })

    socket.on(ApiNames.VoteThreadSuccess, () => {
      socket.emit(ApiNames.GetThreadsDisplayInfo, openedChannel)
    })

    socket.on(ApiNames.DeleteThreadSuccess, () => {
      socket.emit(ApiNames.GetThreadsDisplayInfo, openedChannel)
      dispatch(setNotification({message: 'Thread deleted.', color: 'green'}))
    })
    
    return function cleanup () {
      socket.off(ApiNames.ThreadsDisplayInfo)
      socket.off(ApiNames.VoteThreadSuccess)
      socket.off(ApiNames.DeleteThreadSuccess)
    }
  }, [dispatch, openedChannel])

  return(
    <div>
      {channels.map((channel) =>
        <ChannelBox key={channel.id}
        id={channel.id} 
        name={channel.text}
        followers={channel.followers}
        ct={channel.id!==openedChannel ? null : () => dispatch(closeThreads())}
        />
      )}
    </div>
  )
}

export default Channels