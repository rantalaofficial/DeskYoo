import React, {useState, useEffect} from 'react'
import locationHelper from '../../services/locationApi'

import socket from '../../services/connect'

const NewAnswerBox = ({openedThread, showNotification}) => {
  const [yoo, setYoo] = useState('')
  const [location, setLocation] = useState(null)

  useEffect(() => {
    socket.on('ADDANSWERSUCCESS', () => {
      document.getElementById('root').style.pointerEvents = 'auto'
      socket.emit('GETANSWERSDISPLAYINFO', openedThread.id)
    })
    
    return function cleanup () {
      socket.off('ADDANSWERSUCCESS')
    }
  }, [])

  useEffect(() => {
    async function data () {
      locationHelper.getLocation((data) => setLocation(data))
    }
    data()
  }, [])

  const handleYooSend = (event) => {
    event.preventDefault()

    if(yoo.length>0){
      document.getElementById('root').style.pointerEvents = 'none'
      if(location && location.length!==0){
        socket.emit('ADDANSWER', [yoo, location, openedThread.id])
      }
      else{
        socket.emit('ADDANSWER', [yoo, 'Unknown', openedThread.id])
      }
    }
    else{
      showNotification('Yoo can\'t be empty', 'red')
    }

    setYoo('')
    document.getElementById('texti').value=''

  }

  const handleTextChange = (event) => {
    let text = event.target.value

    if(text.split('\n').length>4){
      document.getElementById('texti').value=yoo
      text=yoo

    }
    //console.log(text)

    setYoo(text)
  }

  return (
    <div className="yellowBox message">
      <form onSubmit={handleYooSend}>
      <textarea className="messageInputTextBox" id='texti' maxLength="300" placeholder='Write your answer here and press 🤟 to send!' type='text' onChange={handleTextChange}></textarea>
      <button className="sendMessageBtn" type='submit' value=''>
        <img src="/logo192.png" alt='Send new answer' width='58px;' height='58px'></img>
      </button>
    </form>
    </div>
    
  )
}

export default NewAnswerBox