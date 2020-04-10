import React from 'react'
import apiHelper from '../../services/dataApi'

const ThreadBox = ({channelId, threadId, text, likes, location, color, sm}) => {
  //console.log(`Color${color}`)


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
        <button onClick={e => handleThreadClick(e, channelId, threadId, sm)}  style={styles} className='message'>  
          <span> {text} 👤</span><br></br>
          <span>📍{location}</span>
        </button>
        <div className="messageLikeContainer">
          <button className="likeButton">▲</button>
          <p id="likeText">{likes}</p>
          <button className="likeButton">▼</button>
        </div>
      </div>
    )
  }
  
  const handleThreadClick = (event, channelId, threadId, sm) => {
    event.preventDefault()
    console.log(channelId)
    apiHelper.getAnswersDisplayInfo(channelId, threadId, (data) => {
      if(data.length!==0){
        console.log(data)
        data.map(message => {
          message.threadId=threadId
          message.channelId=channelId
        })
        console.log(data)
        return sm(data)
      }
      sm([{threadId, channelId}])
    })
  }

export default ThreadBox