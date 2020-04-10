import React from 'react'
import ThreadBox from '../boxes/ThreadBox'

const Threads = ({threads, sm}) => (
    <div>
      {threads.map((thread, i) =>
        <ThreadBox key={i}
        channelId={thread.channelId}
        threadId={i} 
        text={thread.text} 
        likes={thread.likes}
        location={thread.location}
        sm={sm}
        />
      )}
    </div>
    )

export default Threads