import React from 'react'

const OpenedThreadBox = ({openedThread, cm}) => {
  const colorIndex = openedThread.color ? openedThread.color : 0

  const colors=['#E0BBE4', '#AC91C8', '#D291BC', '#FEC8D8', '#FFDFD3']

  const styles = {
    backgroundColor: colors[colorIndex],
    border: '2px solid gray',
  }
  
  let timeDifference = (new Date() - openedThread.time) / 1000;
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
      <button onClick={e => handleOpenedThreadClick(e, cm)} className="threadButton">
      <div className="multilineText">{openedThread.text}</div>
        <br></br>
        <span role="img" aria-label='Location'>{timeText} ago 📍{openedThread.location}</span>
      </button>
      <div className="messageLikeContainer">
        <button className="likeButton">▲</button>
        <p id="likeText">{openedThread.likes}</p>
        <button className="likeButton">▼</button>
      </div>
    </div>
    )
  }
  
  const handleOpenedThreadClick = (event, cm) => {
    event.preventDefault()
    cm()
  }

export default OpenedThreadBox