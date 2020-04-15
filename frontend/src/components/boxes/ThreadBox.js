import React from 'react'

import socket from '../../services/connect'

const ThreadBox = ({id, text, likes, location, color}) => {

  const colorIndex = color ? color : 0


  const colors=[
    ['#e75656', ' #e70b0b'],
    ['#d62f2f', ' #d67a7a'],
    ['#bf1d66', ' #bf68b0'],
    ['#c92e55', ' #c979a0'],
    ['#de2a54', ' #de75aa']]

  const bc=colors[colorIndex][0]
  const br=('2px solid').concat(colors[colorIndex][1])


  const styles = {
    backgroundColor: bc,
    border: br,
    textAlign: 'left',
    padding: '2%',
    width: '90%',
    borderRadius: '10px',
    marginTop: '0%',
    marginLeft: '0%',
    marginRight: '0%',
    marginBottom: '3%'
  }
  
    return (
      <div>
        <button onClick={e => handleThreadClick(e, id)}  style={styles} className='message'>  
          <div className="multilineText">{text}</div>
          <br></br>
          <span role="img" aria-label='Location'>📍</span>{location}
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