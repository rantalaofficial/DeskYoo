import React from 'react'
import ThreadBox from '../boxes/ThreadBox'

const Threads = ({threads, sm}) => (
    <div>
      {threads.map(thread =>
        <ThreadBox key={thread.id}
        id={thread.id} 
        text={thread.text} 
        likes={thread.likes}
        location={thread.location}
        color={thread.color}
        sm={sm}
        />
      )}
    </div>
    )

export default Threads