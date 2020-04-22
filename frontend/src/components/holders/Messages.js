import React, {useEffect} from 'react'
import MessageBox from '../boxes/MessageBox'

import socket from '../../services/connect'

const Messages = ({openedThread, messages, color, messageType, sm, showNotification}) => {
  useEffect(() => {
    socket.on('ANSWERSDISPLAYINFO', data => {
      //console.log(data)
      //console.log('api request: answers')
      document.getElementById('root').style.pointerEvents = 'auto'

      return sm(data)
    })

    if(messageType==='Answer'){
      socket.on('VOTEANSWERSUCCESS', () => {
        document.getElementById('root').style.pointerEvents = 'auto'

        socket.emit('GETANSWERSDISPLAYINFO', openedThread.id)
      })

      socket.on('DELETEANSWERSUCCESS', () => {
        socket.emit('GETANSWERSDISPLAYINFO', openedThread.id)
        showNotification('Deleting an answer successful', 'green')
      })
    }
    
    return function cleanup () {
      socket.off('ANSWERSDISPLAYINFO')
      socket.off('VOTEANSWERSUCCESS')
      socket.off('DELETEANSWERSUCCESS')
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