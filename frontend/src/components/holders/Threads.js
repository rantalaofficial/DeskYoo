import React, {useEffect} from 'react'
import ThreadBox from '../boxes/ThreadBox'

import socket from '../../services/connect'

const Threads = ({threads, sm}) => {
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
  })


  return(
  <div>
    {threads.map(thread =>
      <ThreadBox key={thread.id}
      id={thread.id} 
      text={thread.text} 
      likes={thread.likes}
      location={thread.location}
      color={thread.color}
      />
    )}
  </div>
  )
}

export default Threads