import React from 'react'

const UserInfo = ({user}) => {
  if(user){
    return(
    <div className='yellowBox' id='UserInfo'>
      <p>Username: {user.username}</p>
      <p>{user.score} Yoo Points</p>
    </div>
    )}
  else{
    return(
      <div className='yellowBox'>
        <p>You must first log in</p>
      </div>
    )
  }
}

export default UserInfo