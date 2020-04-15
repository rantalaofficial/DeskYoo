import React from 'react'

const OpenedThreadBox = ({openedThread, cm}) => {
  const colorIndex = openedThread.color ? openedThread.color : 0

  const colors=['#E0BBE4', '#AC91C8', '#D291BC', '#FEC8D8', '#FFDFD3']
    
  const br=('2px solid gray')
  const bc=colors[colorIndex]


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