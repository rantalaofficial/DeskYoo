import React, {useState, useEffect} from 'react'
import locationHelper from '../../services/locationApi'

import socket from '../../services/connect'

const NewAnswerBox = ({openedThread, showNotification}) => {
  const [answerText, setAnswerText] = useState('')
  const [location, setLocation] = useState(null)

  useEffect(() => {
    socket.on('ADDANSWERSUCCESS', () => {
      document.getElementById('root').style.pointerEvents = 'auto'
      socket.emit('GETTANSWERSDISPLAYINFO', openedThread)
    })
    
    return function cleanup () {
      socket.off('ADDTHREADSUCCESS')
    }
  }, [])

  useEffect(() => {
    async function data () {
      locationHelper.getLocation((data) => setLocation(data))
    }
    data()
  }, [])

  const handleAnswerSend = (event) => {
    event.preventDefault()

    if(answerText.length>0){
      document.getElementById('root').style.pointerEvents = 'none'
      if(location && location.length!==0){
        socket.emit('ADDANSWER', [answerText, location, openedThread])
      }
      else{
        socket.emit('ADDANSWER', [answerText, 'Unknown', openedThread])
      }
    }
    else{
      showNotification('Yoo can\'t be empty', 'red')
    }

    setAnswerText('')
    document.getElementById('texti').value=''

  }

  const handleTextChange = (event) => {
    let text = event.target.value

    if(text.split('\n').length>4){
      document.getElementById('texti').value=answerText
      text=answerText

    }
    //console.log(text)

    setAnswerText(text)
  }

  return (
    <div className="yellowBox message">
      <form onSubmit={handleAnswerSend}>
      <textarea className="messageInputTextBox" id='texti' maxLength="300" placeholder='Write your answer here and press 🤟 to send!' type='text' onChange={handleTextChange}></textarea>
      <button className="sendMessageBtn" type='submit' value=''>
        <img className="sendMessageBtnImage" src="/logo192.png" alt='Send new answer'></img>
      </button>
    </form>
    </div>
    
  )
}

export default NewAnswerBox