import React from 'react'

const UserInfo = ({user}) => (
    <div className="yellowBox" id="UserInfo">
      <p>{user.points} Yoo Points</p>
      <p>UserID: {user.id}</p>
    </div>
)

export default UserInfo