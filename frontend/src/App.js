import React, {useState, useEffect} from 'react'
import './App.css'
import apiHelper from './services/api'
import Header from './components/boxes/Header'
import UserInfo from './components/boxes/UserInfo'
import OpenedThreadBox from './components/boxes/OpenedThreadBox'
import Messages from './components/holders/Messages'
import Threads from './components/holders/Threads'
import Channels from './components/holders/Channels'

const testUser = {
  points: 2000,
  id: 69
}

const App = () => {
  const [messages, setMessages] = useState([])
  const [openedThread, setOpenedThread] = useState({})
  const [threads, setThreads] = useState([])
  const [channels, setChannels] = useState([])
  const [user, setUser] = useState(testUser)

  const setToThreads = (data) => {
    console.log('here')
    setThreads(data)
  }

  const setToMessages = (data) => {
    console.log('here 2')
    setMessages(data)

    setOpenedThread(threads[data[0].threadId])
  }

  const closeMessages = () => {
    setMessages([])
  }

  useEffect(() => {
    apiHelper.getChannelDisplayInfo((data) => setChannels(data))
  },[])

  return (
    <div>
      <Header/>
      <div className='row'>
        <div id='channelColumn'>
          <UserInfo user={user} />
          <Channels channels={channels}
          st={setToThreads} />
        </div>
        <div id='messageColumn'>
          {messages.length!==0 
          ? 
          <div>
            <OpenedThreadBox 
            openedThread={openedThread}
            cm={closeMessages}
            />
            <Messages messages={messages} />
          </div>
          : 
          <Threads threads={threads}
          sm={setToMessages} />}
        </div>
      </div>
    </div>
  )
}

export default App;