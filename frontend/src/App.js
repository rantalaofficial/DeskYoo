import React, {useState, useEffect} from 'react'
import './App.css'
import dataHelper from './services/dataApi'
import userHelper from './services/userApi'
import errorHelper from './services/errorApi'
import Header from './components/boxes/Header'
import UserInfo from './components/boxes/UserInfo'
import OpenedThreadBox from './components/boxes/OpenedThreadBox'
import Messages from './components/holders/Messages'
import Threads from './components/holders/Threads'
import Channels from './components/holders/Channels'
import OpenedChannels from './components/holders/OpenedChannels'
import Notification from './components/util/Notification'

const App = () => {
  const [messages, setMessages] = useState([])
  const [openedThread, setOpenedThread] = useState({})
  const [threads, setThreads] = useState([])
  const [openedChannel, setOpenedChannel] = useState(null)
  const [channels, setChannels] = useState([])

  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState({message: null, color: 'green'})

  const setToThreads = (data) => {
    setThreads([])
    setMessages([])
    setOpenedChannel(data[0].channelId)
    console.log('here')
    if(data[0].text){
      setThreads(data)
    }
  }

  const setToMessages = (data) => {
    setMessages([])
    setOpenedThread(threads[data[0].threadId])
    console.log('here 2')
    if(data[0].text){
      setMessages(data)
    }
  }

  const closeThreads = () => {
    setThreads([])
    setOpenedChannel(null)
    setOpenedThread(null)
    setMessages([])
  }

  const closeMessages = () => {
    setMessages([])
    setOpenedThread(null)
  }

  const showNotification = (message, color) =>{
    setNotification({message, color})
    setTimeout(() => {
      setNotification({message: null, color})
    }, 3000)
  }

  useEffect( () => {
    userHelper.login(['Aapooo', '22222222', ], user => setUser(user))
  },[])

  useEffect(() => {
    if(user && !user.username){
      console.log(user)
      userHelper.getUserDisplayInfo(user => setUser(user))

      dataHelper.getChannelDisplayInfo((data) => setChannels(data))
    }
  }, [user])

  useEffect(() => {
    errorHelper.listenError(errorText => showNotification(errorText, 'red'))
  })

  return (
    <div>
      <Header />
      <br></br>
      <Notification message={notification.message} color={notification.color}/>
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
            <Messages
            messages={messages}
            color={openedThread.color} />
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