import React, {useEffect} from 'react'
import MessageBox from '../boxes/MessageBox'

import socket from '../../services/connect'

const Threads = ({threads, sm}) => {
  useEffect(() => {
    socket.on('ANSWERSDISPLAYINFO', data => {
      //console.log(data)
      //console.log('api request: answers')
      document.getElementById('root').style.pointerEvents = 'auto'

      //console.log(data)

      return sm(data)
    })
    
    return function cleanup () {
      socket.off('ANSWERSDISPLAYINFO')
    }
  }, [])

  return(
  <div>
    {threads.map(thread =>
      <MessageBox key={thread.id}
      id={thread.id} 
      text={thread.text} 
      likes={thread.likes}
      location={thread.location}
      color={thread.color}
      time={thread.time}
      messageType='Thread'
      />
    )}
  </div>
  )
}

export default Threads