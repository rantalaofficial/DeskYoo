import React, {useEffect} from 'react'
import MessageBox from '../boxes/MessageBox'

import socket from '../../services/connect'

import ApiNames from '../../services/ApiNames'

const Messages = ({openedThread, messages, color, messageType, sm, showNotification}) => {
  useEffect(() => {
    socket.on(ApiNames.AnswersDisplayInfo, data => {
      //console.log(data)
      //console.log('api request: answers')
      document.getElementById('root').style.pointerEvents = 'auto'

      return sm(data)
    })

    if(messageType==='Answer'){
      socket.on(ApiNames.VoteAnswerSuccess, () => {
        document.getElementById('root').style.pointerEvents = 'auto'

        socket.emit(ApiNames.GetAnswersDisplayInfo, openedThread.id)
      })

      socket.on(ApiNames.DeleteAnswerSuccess, () => {
        socket.emit(ApiNames.GetAnswersDisplayInfo, openedThread.id)
        showNotification('Answer deleted.', 'green')
      })
    }
    
    return function cleanup () {
      socket.off(ApiNames.AnswersDisplayInfo)
      socket.off(ApiNames.VoteAnswerSuccess)
      socket.off(ApiNames.DeleteAnswerSuccess)
    }
  }, [sm, messageType, openedThread])

  return(
    <div>
      {messages.map(message =>
        <MessageBox key={message.id}
        id={message.id} 
        text={message.text} 
        votes={message.votes}
        location={message.location}
        color={messageType==='Answer' ? color : message.color}
        time={message.time}
        messageType={messageType}
        />
      )}
    </div>
  )
}

export default Messages