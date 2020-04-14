import React from 'react'
import apiHelper from '../../services/dataApi'

const ThreadBox = ({id, text, likes, location, color, sm}) => {
  //console.log(`Color${color}`)

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
        <button onClick={e => handleThreadClick(e, id, sm)}  style={styles} className='message'>  
          <div class="multilineText">{text}</div>
          <br></br>
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
  
  const handleThreadClick = (event, id, sm) => {
    event.preventDefault()
    console.log(`Thread id ${id}`)
    apiHelper.getAnswersDisplayInfo(id, (data) => {
      if(data.length!==0){
        console.log(data)
        return sm(data)
      }
      sm([{parentId: id}])
    })
  }

export default ThreadBox