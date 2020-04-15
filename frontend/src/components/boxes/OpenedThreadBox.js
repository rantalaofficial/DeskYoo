import React from 'react'

const OpenedThreadBox = ({openedThread, cm}) => {
  const colorIndex = openedThread.color ? openedThread.color : 0


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
    margin: '0%'
  }
  
  return (
    <div>
      <button onClick={e => handleOpenedThreadClick(e, cm)}  style={styles} className='message'>
        <span> {openedThread.text} 👤</span><br></br>
        <span role="img" aria-label='Location'>📍</span>{openedThread.location}
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