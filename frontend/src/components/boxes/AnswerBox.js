import React from 'react'

const AnswerBox = ({text, likes, location, openedThread}) => {
  const colorIndex = openedThread.color ? openedThread.color : 0

  const colors=['#E0BBE4', '#AC91C8', '#D291BC', '#FEC8D8', '#FFDFD3']

  const styles = {
    backgroundColor: colors[colorIndex],
    border: '2px solid gray',
  }
  
  return(
    <div style={styles} className='message yellowBox'>
        <div className="multilineText">{text}</div>
        <br></br>
        <span role="img" aria-label='Location'>📍</span>{location}
      <div className="messageLikeContainer">
        <button className="likeButton">▲</button>
        <p id="likeText">{likes}</p>
        <button className="likeButton">▼</button>
      </div>
    </div>
  )
}

export default AnswerBox