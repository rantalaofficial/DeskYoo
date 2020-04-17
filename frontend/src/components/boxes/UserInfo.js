import React from 'react'

const UserInfo = ({user}) => (
  <div className='yellowBox' id='UserInfo'>
    <p>Username: {user.username}</p>
    <p>{user.score} Yoo Points</p>
  </div>
)

export default UserInfo