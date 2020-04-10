import React, {useState, useEffect} from 'react'
import './App.css'
import dataHelper from './services/dataApi'
import userHelper from './services/userApi'
import Header from './components/boxes/Header'
import UserInfo from './components/boxes/UserInfo'
import OpenedThreadBox from './components/boxes/OpenedThreadBox'
import Messages from './components/holders/Messages'
import Threads from './components/holders/Threads'
import Channels from './components/holders/Channels'
import OpenedChannels from './components/holders/OpenedChannels'

const App = () => {
  const [messages, setMessages] = useState([])
  const [openedThread, setOpenedThread] = useState({})
  const [threads, setThreads] = useState([])
  const [openedChannel, setOpenedChannel] = useState(null)
  const [channels, setChannels] = useState([])
  const [user, setUser] = useState({})

  const setToThreads = (data) => {
    setThreads([])
    setMessages([])
    console.log('here')
    if(data[0].text){
      setThreads(data)
    }

    setOpenedChannel(data[0].channelId)
  }

  const setToMessages = (data) => {
    setMessages([])
    console.log('here 2')
    if(data[0].text){
      setMessages(data)
    }

    setOpenedThread(threads[data[0].threadId])
  }

  const closeThreads = () => {
    setThreads([])
    setOpenedChannel(null)
    setMessages([])
  }

  const closeMessages = () => {
    setMessages([])
  }

  useEffect(() => {
    userHelper.login(['Aapooo', '22222222', ], user => setUser(user))
  },[])

  useEffect(() => {
    if(user){
      userHelper.getUserDisplayInfo(user => setUser(user))

      dataHelper.getChannelDisplayInfo((data) => setChannels(data))
    }
  }, [])

  console.log(user)

  return (
    <div>
      <Header/>
      <div className='row'>
        <div id='channelColumn'>
          {openedChannel!==null
          ?
          <div>
            <UserInfo user={user} />
            <OpenedChannels 
            channels={channels}
            st={setToThreads}
            ct={closeThreads}
            openedChannel={openedChannel} />
          </div>
          :
          <div>
            <UserInfo user={user} />
            <Channels 
            channels={channels}
            st={setToThreads} />
          </div>
          }
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