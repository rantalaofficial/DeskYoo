import React from 'react'

const MessageBox = ({text, likes, location}) => (
    <div className='yellowBox message'>
      <span> {text} 👤</span><br></br>
      <span>📍{location}</span>
      <div className="messageLikeContainer">
        <button className="likeButton">▲</button>
        <p id="likeText">{likes}</p>
        <button className="likeButton">▼</button>
      </div>
    </div>
)

export default MessageBox