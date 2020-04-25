import React, {useEffect} from 'react'
import MessageBox from '../boxes/MessageBox'

import socket from '../../services/connect'

import { useDispatch } from 'react-redux'

import { setAnswers } from '../../reducers/dataReducer'

import { setNotification } from '../../reducers/notificationReducer'

const Messages = ({opened, messages, color, messageType}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('ANSWERSDISPLAYINFO', data => {
      //console.log(data)
      //console.log('api request: answers')
      document.getElementById('root').style.pointerEvents = 'auto'

      return dispatch(setAnswers(data))
    })

    if(messageType==='Answer'){
      socket.on('VOTEANSWERSUCCESS', () => {
        document.getElementById('root').style.pointerEvents = 'auto'

        socket.emit('GETANSWERSDISPLAYINFO', opened)
      })

      socket.on('DELETEANSWERSUCCESS', () => {
        socket.emit('GETANSWERSDISPLAYINFO', opened)
        dispatch(setNotification({message: 'Deleting an answer successful', color: 'green'}))
      })
    }
    
    return function cleanup () {
      socket.off('ANSWERSDISPLAYINFO')
      socket.off('VOTEANSWERSUCCESS')
      socket.off('DELETEANSWERSUCCESS')
    }
  }, [dispatch, messageType, opened])

  useEffect(() => {
    let mounted = true
    function update() {
      setTimeout(() => {
        if(mounted) {
          document.getElementById('root').style.pointerEvents = 'none'
          socket.emit(messageType==='Thread' ? 'GETTHREADSDISPLAYINFO' : 'GETANSWERSDISPLAYINFO' , opened)
          update()
        }
      }, 45000)
    }
    update()

    return () => mounted = false
  }, [messageType, opened])

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