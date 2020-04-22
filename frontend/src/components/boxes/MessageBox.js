import React from 'react'

import utils from '../../services/utils'

import socket from '../../services/connect'

const MessageBox = ({id, text, votes, location, color, time, messageType, cm}) => {
  const colorIndex = color ? color : 0

  const colors=['#E0BBE4', '#AC91C8', '#D291BC', '#FEC8D8', '#FFDFD3']

  const styles = {
    backgroundColor: colors[colorIndex],
    border: '2px solid gray',
  }
  
  const timeText = utils.getTimeText(time)

  const handleClick = (event) => {
    if(messageType==='Answer'){
      return
    }

    if(messageType==='Thread'){
      return handleThreadClick(event, id)
    }

    if(messageType==='OpenedThread'){
      return handleOpenedThreadClick(event, cm)
    }
  }

  return(
    <div className='message' style={styles}>
      <table className='messageTable'>
        <tbody>
          <tr>
            <td onClick={handleClick} className='infoCell' rowSpan='2' valign='top'>
              {text}
            </td>
            <td onClick={(event) => handleVote(event, messageType, true, id)} className='voteCell' valign='top'>▲</td>
          </tr>
          <tr>
            <td className='voteCell'>
                {votes}
            </td>
          </tr>
          <tr>
            <td className='infoCell'>
              <span role="img" aria-label='Location'>{timeText} ago 📍{location} [Options]</span>
            </td>
            <td onClick={(event) => handleVote(event, messageType, false, id)} className='voteCell'>▼</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const handleVote = (event, messageType, vote, id) => {
  event.preventDefault()
  document.getElementById('root').style.pointerEvents = 'none'

  if(messageType==='Thread' || messageType==='OpenedThread'){
    socket.emit('VOTETHREAD', [id, vote])
  }

  if(messageType==='Answer'){
    socket.emit('VOTEANSWER', [id, vote])
  }
}

const handleOpenedThreadClick = (event, cm) => {
  event.preventDefault()
  cm()
}

const handleThreadClick = (event, id) => {
  //console.log('thread click')
  event.preventDefault()
  document.getElementById('root').style.pointerEvents = 'none'

  socket.emit('GETANSWERSDISPLAYINFO', id)
}

export default MessageBox