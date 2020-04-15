import React from 'react'

import socket from '../../services/connect'

const ThreadBox = ({id, text, likes, location, color, time}) => {

  const colorIndex = color ? color : 0

  const colors=['#E0BBE4', '#AC91C8', '#D291BC', '#FEC8D8', '#FFDFD3']

  const styles = {
    backgroundColor: colors[colorIndex],
    border: '2px solid gray',
  }
  
  let timeDifference = (new Date() - time) / 1000;
  let timeText = ''
  if(timeDifference < 60) {
    timeText = Math.round(timeDifference) + "s"
  } else if(timeDifference < 3600) {
    timeText = Math.round(timeDifference / 60) + "min"
  } else if(timeDifference < 86400) {
    timeText = Math.round(timeDifference / 3600) + "h"
  } else {
    timeText = Math.round(timeDifference / 86400) + "d"
  }

  return (
    <div className='message' style={styles}>
      <button onClick={e => handleThreadClick(e, id)} className="threadButton">  
        <div className="multilineText">{text}</div>
        <br></br>
        <span role="img" aria-label='Location'>{timeText} ago 📍{location}</span>
      </button>
      <div className="messageLikeContainer">
        <button className="likeButton">▲</button>
        <p id="likeText">{likes}</p>
        <button className="likeButton">▼</button>
      </div>
    </div>
  )


  }
  
  const handleThreadClick = (event, id) => {
    //console.log('thread click')
    event.preventDefault()
    document.getElementById('root').style.pointerEvents = 'none'

    socket.emit('GETANSWERSDISPLAYINFO', id)
  }

export default ThreadBox