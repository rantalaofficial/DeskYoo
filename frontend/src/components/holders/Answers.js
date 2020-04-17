import React, {useEffect} from 'react'
import AnswerBox from '../boxes/AnswerBox'

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
        <AnswerBox key={i} 
        text={answer.text} 
        likes={answer.likes}
        location={answer.location}
        openedThread={openedThread}
        time={answer.time}
        />
      )}
    </div>
)}

export default Answers