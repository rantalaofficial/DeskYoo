import React, {useState, useEffect} from 'react'
import './App.css'

import Header from './components/boxes/Header'
import UserInfo from './components/boxes/UserInfo'
import LogInBox from './components/boxes/LogInBox'
import OpenedThreadBox from './components/boxes/OpenedThreadBox'
import Answers from './components/holders/Answers'
import NewAnswerBox from './components/boxes/NewAnswerBox'
import NewThreadBox from './components/boxes/NewThreadBox'
import Threads from './components/holders/Threads'
import Channels from './components/holders/Channels'
import OpenedChannels from './components/holders/OpenedChannels'
import Notification from './components/util/Notification'

import socket from './services/connect'
import appHandlers from './services/appEvents'

const App = () => {
  const [answers, setAnswers] = useState([])
  const [openedThread, setOpenedThread] = useState(null)
  const [threads, setThreads] = useState([])
  const [openedChannel, setOpenedChannel] = useState(null)
  const [channels, setChannels] = useState([])

  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState({message: null, color: 'green'})

  const setToThreads = (data) => {
    setOpenedChannel(null)
    setOpenedThread(null)
    setThreads([])
    setAnswers([])

    setOpenedChannel(data[0].parentId)
    //console.log(data)
    //console.log('here')
    if(data[0].text){
      setThreads(data)
    }
  }

  const setToMessages = (data) => {
    setOpenedThread(null)
    setAnswers([])

    //console.log(data)
    const openedThread = threads.find(
      (thread) => thread.id===data[0].parentId)
    setOpenedThread(openedThread)
    //console.log(openedThread)
    //console.log('here 2')
    if(data[0].text){
      setAnswers(data)
    }
  }

  const closeThreads = () => {
    setThreads([])
    setOpenedChannel(null)
    setOpenedThread(null)
    setAnswers([])
  }

  const closeAnswers = () => {
    setAnswers([])
    setOpenedThread(null)
  }

  const setToUser = (user) => {
    setUser(user)
  }

  const setToChannels = (channels) => {
    setChannels(channels)
  }

  const showNotification = (message, color) => {
    setNotification({message, color})
    setTimeout(() => {
      setNotification({message: null, color})
    }, 4000)
  }

  useEffect(() => {
    if(user && !user.username){
      socket.emit('GETUSERDISPLAYINFO')

      socket.emit('GETCHANNELSDISPLAYINFO')
    }
  }, [user])

  useEffect(() => {
    appHandlers(socket, showNotification, setToUser, setToChannels)
  }, [])

  return (
    <div>
      <Header />
      <br></br>
      <Notification message={notification.message} color={notification.color}/>
      <br></br>
      {!user ? 
      <LogInBox 
      su={setToUser}
      showNotification={showNotification} />
      :
      <div className='row'>
        <div id='channelColumn'>
          {user ? <UserInfo user={user} /> : null}
          {openedChannel
          ?
          <div>
            <OpenedChannels 
            channels={channels}
            st={setToThreads}
            ct={closeThreads}
            openedChannel={openedChannel} 
            />
          </div>
          :
          <div>
            <Channels 
            channels={channels}
            st={setToThreads} 
            />
          </div>
          }
        </div>
        <div id='messageColumn'>
          {openedThread 
          ? 
          <div>
            <OpenedThreadBox 
            openedThread={openedThread}
            cm={closeAnswers}
            />
            <Answers
            answers={answers}
            openedThread={openedThread} 
            sm={setToMessages} 
            />
            <NewAnswerBox
              openedThread={openedThread} 
              showNotification={showNotification}
            />
          </div>
          : 
          openedChannel 
          ?
          <div>
            <NewThreadBox
            openedChannel={openedChannel}
            showNotification={showNotification}
            />
            <Threads 
            threads={threads}
            sm={setToMessages} 
            />
          </div>
          :
          null
          }
        </div>
      </div>
      }
    </div>
  )
}

export default App;