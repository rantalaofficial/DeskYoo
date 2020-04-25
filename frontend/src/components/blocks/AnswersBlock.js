import React from 'react'

import { useSelector } from 'react-redux'

import MessageBox from '../boxes/MessageBox'
import NewMessageBox from '../boxes/NewMessageBox'
import Messages from '../holders/Messages'

const AnswersBlock = (props) => {
  const answers = useSelector(state => state.dataReducer.answers)
  const openedThread = useSelector(state => state.dataReducer.openedThread)
  const openedChannel = useSelector(state => state.dataReducer.openedChannel)

  return (
    <div>
      {openedThread && openedChannel
      ?
      <div>
        <MessageBox
          id={openedThread.id}
          text={openedThread.text}
          votes={openedThread.votes}
          location={openedThread.location}
          color={openedThread.color}
          time={openedThread.time}
          messageType='OpenedThread'
        />
        <Messages
          opened={openedThread.id}
          messages={answers}
          color={openedThread.color}
          messageType='Answer'
        />
        <NewMessageBox
          id={openedThread.id} 
          messageType='Answer'
        />
      </div>
      :
      null
      }
    </div>
  )
}

export default AnswersBlock