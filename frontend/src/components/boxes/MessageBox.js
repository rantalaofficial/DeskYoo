import React from 'react'

const MessageBox = ({text, likes, location}) => (
    <div className='greenBox message'>
      <p>{text} @{likes} {location}</p>
    </div>
)

export default MessageBox