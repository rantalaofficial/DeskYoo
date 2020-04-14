import React from 'react'
import MessageBox from '../boxes/MessageBox'

const Messages = ({messages, openedThread}) => (
    <div>
      {messages.map((message, i) =>
        <MessageBox key={i} 
        text={message.text} 
        likes={message.likes}
        location={message.location}
        openedThread={openedThread}
        />
      )}
    </div>
)

export default Messages