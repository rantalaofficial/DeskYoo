import React, {useState, useEffect} from 'react'
import locationHelper from '../../services/locationApi'

import socket from '../../services/connect'

const NewThreadBox = ({openedChannel}) => {
  const [yoo, setYoo] = useState('')
  const [location, setLocation] = useState(null)

  useEffect(() => {
    socket.on('ADDTHREADSUCCESS', () => 
    socket.emit('GETTHREADSDISPLAYINFO', openedChannel))
    
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

    if(location && location.length!==0){
      socket.emit('ADDTHREAD', [yoo, location, openedChannel])
    }
    else{
      socket.emit('ADDTHREAD', [yoo, 'Unknown', openedChannel])
    }

    setYoo('')
    document.getElementById('texti').value=''

  }

  return (
    <div className="greenBox message">
      <form className='' onSubmit={handleYooSend}>
      <textarea className="messageInputTextBox" id='texti' maxLength="300" placeholder='Write your Yoo here and press 🤟 to send!' type='text' onChange={(event) => setYoo(event.target.value)}></textarea>
      <button className="sendMessageBtn" type='submit' value=''>
        <img src="/logo192.png" alt='Send new thread' width='58px;' height='58px'></img>
      </button>
    </form>
    </div>
    
  )
}

export default NewThreadBox