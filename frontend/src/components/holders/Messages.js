import React from 'react'
import MessageBox from '../boxes/MessageBox'

const Messages = ({messages, color}) => (
    <div>
      {messages.map((message, i) =>
        <MessageBox key={i} 
        text={message.text} 
        likes={message.likes}
        location={message.location}
        color={color}
        />
      )}
    </div>
)

export default Messages