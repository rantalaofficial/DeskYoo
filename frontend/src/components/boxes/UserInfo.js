import React from 'react'

const UserInfo = ({user}) => (
    <div className="yellowBox" id="UserInfo">
      <p>{user} Yoo Points</p>
      <p>UserID: {user}</p>
    </div>
)

export default UserInfo