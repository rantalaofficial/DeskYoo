import React, {useEffect} from 'react'
import MessageBox from '../boxes/MessageBox'

import socket from '../../services/connect'

const Answers = ({answers, openedThread, sm}) => {
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
  }, [])
  
  return(
    <div>
      {answers.map((answer, i) =>
        <MessageBox key={i} 
        text={answer.text} 
        likes={answer.likes}
        location={answer.location}
        color={openedThread.color}
        time={answer.time}
        messageType='Answer'
        />
      )}
    </div>
)}

export default Answers