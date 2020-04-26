import React, {useEffect} from 'react'
import MessageBox from '../boxes/MessageBox'

import socket from '../../services/connect'

import { useDispatch } from 'react-redux'

import { setAnswers } from '../../reducers/dataReducer'

import { setNotification } from '../../reducers/notificationReducer'

import ApiNames from '../../services/ApiNames'

const Messages = ({opened, messages, color, messageType}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on(ApiNames.AnswersDisplayInfo, data => {
      //console.log(data)
      //console.log('api request: answers')
      document.getElementById('root').style.pointerEvents = 'auto'

      return dispatch(setAnswers(data))
    })

    if(messageType==='Answer'){
      socket.on(ApiNames.VoteAnswerSuccess, () => {
        document.getElementById('root').style.pointerEvents = 'auto'

        socket.emit(ApiNames.GetAnswersDisplayInfo, opened)
      })

      socket.on(ApiNames.DeleteAnswerSuccess, () => {
        socket.emit(ApiNames.GetAnswersDisplayInfo, opened)
        dispatch(setNotification({message: 'Answer deleted.', color: 'green'}))
      })
    }
    
    return function cleanup () {
      socket.off(ApiNames.AnswersDisplayInfo)
      socket.off(ApiNames.VoteAnswerSuccess)
      socket.off(ApiNames.DeleteAnswerSuccess)
    }
  }, [dispatch, messageType, opened])

  useEffect(() => {
    const interval = setInterval(() => {
      document.getElementById('root').style.pointerEvents = 'none'
      socket.emit(messageType==='Thread' ? ApiNames.GetThreadsDisplayInfo : ApiNames.GetAnswersDisplayInfo , opened)
    }, 45000)

    return () => clearInterval(interval)
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