import React, {useState, useEffect} from 'react'
import locationHelper from '../../services/locationApi'

import socket from '../../services/connect'

const NewThreadBox = ({openedChannel, showNotification}) => {
  const [yoo, setYoo] = useState('')
  const [location, setLocation] = useState(null)

  useEffect(() => {
    socket.on('ADDTHREADSUCCESS', () => {
      document.getElementById('root').style.pointerEvents = 'auto'
      socket.emit('GETTHREADSDISPLAYINFO', openedChannel)
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

  const handleYooSend = (event) => {
    event.preventDefault()

    if(yoo.length>0){
      document.getElementById('root').style.pointerEvents = 'none'
      if(location && location.length!==0){
        socket.emit('ADDTHREAD', [yoo, location, openedChannel])
      }
      else{
        socket.emit('ADDTHREAD', [yoo, 'Unknown', openedChannel])
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
      <textarea className="messageInputTextBox" id='texti' maxLength="300" placeholder='Write your Yoo here and press 🤟 to send!' type='text' onChange={handleTextChange}></textarea>
      <button className="sendMessageBtn" type='submit' value=''>
        <img className="sendMessageBtnImage" src="/logo192.png" alt='Send new thread'></img>
      </button>
    </form>
    </div>
    
  )
}

export default NewThreadBox