import React from 'react'

import socket from '../../services/connect'

const UserInfo = ({user, logOut, showNotification}) => (
  user ?
  <div className='yellowBox' id='UserInfo'>
    <p>Username: {user.username}</p>
    <p>{user.score} Yoo Points</p>
    <input style={{backgroundColor: '#F05035', border: '2px solid gray'}} className='LogInElement' type='button' value='Logout' onClick={() => {
      socket.emit('LOGOUT')
      logOut()
      showNotification('Logged out', 'green')
      }}>

    </input>
    <br></br>
    <br></br>
  </div>
  :
  null
)

export default UserInfo