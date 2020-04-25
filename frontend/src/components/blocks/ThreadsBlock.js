import React from 'react'

import { useSelector } from 'react-redux'

import NewMessageBox from '../boxes/NewMessageBox'
import Messages from '../holders/Messages'

const ThreadsBlock = (props) => {
  const threads = useSelector(state => state.dataReducer.threads)
  const openedThread = useSelector(state => state.dataReducer.openedThread)
  const openedChannel = useSelector(state => state.dataReducer.openedChannel)

  return (
    <div>
      {openedChannel && !openedThread
      ?
      <div>
        <NewMessageBox
          id={openedChannel}
          messageType='Thread'
        />
        <Messages
          opened={openedChannel} 
          messages={threads}
          messageType='Thread'
        />
      </div>
      :
      null
      }
    </div>
  )
}

export default ThreadsBlock