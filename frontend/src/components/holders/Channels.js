import React, {useEffect} from 'react'
import ChannelBox from '../boxes/ChannelBox'

import socket from '../../services/connect'

import { useSelector, useDispatch } from 'react-redux'

import { setNotification } from '../../reducers/notificationReducer'

import { setThreads, closeThreads } from '../../reducers/dataReducer'

const Channels = (props) => {

  const channels = useSelector(state => state.dataReducer.channels)

  const openedChannel = useSelector(state => state.dataReducer.openedChannel)

  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('THREADSDISPLAYINFO', data => {
      //console.log(data)
      //console.log('api request: Channels')
      document.getElementById('root').style.pointerEvents = 'auto'

      return dispatch(setThreads(data))
    })

    socket.on('VOTETHREADSUCCESS', () => {
      socket.emit('GETTHREADSDISPLAYINFO', openedChannel)
    })

    socket.on('DELETETHREADSUCCESS', () => {
      socket.emit('GETTHREADSDISPLAYINFO', openedChannel)
      dispatch(setNotification({message: 'Deleting a thread successful', color: 'green'}))
    })
    
    return function cleanup () {
      socket.off('THREADSDISPLAYINFO')
      socket.off('VOTETHREADSUCCESS')
      socket.off('DELETETHREADSUCCESS')
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