import React, {useEffect} from 'react'
import MessageBox from '../boxes/MessageBox'

import socket from '../../services/connect'

const Messages = ({messages, color, messageType, sm}) => {
  useEffect(() => {
    socket.on('ANSWERSDISPLAYINFO', data => {
      //console.log(data)
      //console.log('api request: answers')
      document.getElementById('root').style.pointerEvents = 'auto'

      return sm(data)
    })
    
    return function cleanup () {
      socket.off('ANSWERSDISPLAYINFO')
    }
  }, [sm])

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