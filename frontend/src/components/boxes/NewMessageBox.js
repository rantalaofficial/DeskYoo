import React, {useState, useEffect} from 'react'
import locationHelper from '../../services/locationApi'

import socket from '../../services/connect'

const NewMessageBox = ({id, showNotification, messageType}) => {
  const [messageText, setMessageText] = useState('')
  const [location, setLocation] = useState(null)

  useEffect(() => {
    socket.on(messageType==='Answer' ? 'ADDANSWERSUCCESS' : 'ADDTHREADSUCCESS', () => {
      document.getElementById('root').style.pointerEvents = 'auto'
      socket.emit(messageType==='Answer' ? 'GETANSWERSDISPLAYINFO' : 'GETTHREADSDISPLAYINFO', id)
    })
    
    return function cleanup () {
      messageType==='Answer' ? socket.off('ADDANSWERSUCCESS') : socket.off('ADDTHREADSUCCESS')
    }
  }, [])

  useEffect(() => {
    async function data () {
      locationHelper.getLocation((data) => setLocation(data))
    }
    data()
  }, [])

  const handleMessageSend = (event) => {
    event.preventDefault()

    if(messageText.length>0){
      document.getElementById('root').style.pointerEvents = 'none'

      const handler = messageType==='Answer' ? 'ADDANSWER' : 'ADDTHREAD'

      socket.emit(handler, [messageText, location && location.length!==0 ? location : 'Unknown', id])
    }
    else{
      showNotification('Yoo can\'t be empty', 'red')
    }

    setMessageText('')
    document.getElementById('texti').value=''

  }

  const handleTextChange = (event) => {
    let text = event.target.value

    if(text.split('\n').length>4){
      document.getElementById('texti').value=messageText
      text=messageText

    }
    //console.log(text)

    setMessageText(text)
  }

  return (
    <div className="yellowBox message">
      <form onSubmit={handleMessageSend}>
      <textarea className="messageInputTextBox" id='texti' maxLength="300" placeholder={messageType==='Answer' ? 'Write your answer here and press 🤟 to send!' : 'Write your Yoo here and press 🤟 to send!'} type='text' onChange={handleTextChange}></textarea>
      <button className="sendMessageBtn" type='submit' value=''>
        <img className="sendMessageBtnImage" src="/logo192.png" alt={messageType==='Answer' ? 'Send new answer' : 'Send new thread'}></img>
      </button>
    </form>
    </div> 
  )
}

export default NewMessageBox