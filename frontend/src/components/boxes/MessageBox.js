import React from 'react'

const MessageBox = ({text, likes, location, color}) => {
  const colors=[
    ['#e75656', ' #e70b0b'],
    ['#d62f2f', ' #d67a7a'],
    ['#bf1d66', ' #bf68b0'],
    ['#c92e55', ' #c979a0'],
    ['#de2a54', ' #de75aa']]
  
  const bc=colors[color][0]
  const br=('2px solid').concat(colors[color][1])
  
  
  const styles = {
    backgroundColor: bc,
    border: br,
  }
  
  return(
    <div style={styles} className='yellowBox message'>
        <span> {text} 👤</span><br></br>
        <span>📍{location}</span>
      <div className="messageLikeContainer2">
        <button className="likeButton">▲</button>
        <p id="likeText">{likes}</p>
        <button className="likeButton">▼</button>
      </div>
    </div>
  )
}

export default MessageBox