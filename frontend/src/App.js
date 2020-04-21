import React, {useState, useEffect, useCallback} from 'react'
import './App.css'

import Header from './components/boxes/Header'
import UserInfo from './components/boxes/UserInfo'
import LogInBox from './components/boxes/LogInBox'
import MessageBox from './components/boxes/MessageBox'
import NewMessageBox from './components/boxes/NewMessageBox'
import Messages from './components/holders/Messages'
import Channels from './components/holders/Channels'
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

  const setToThreads = useCallback((data) => {
    setOpenedChannel(null)
    setOpenedThread(null)
    setThreads([])
    setAnswers([])

    //console.log(data)
    //console.log('here')
    if(data[0].text){
      setThreads(data)
    }
    setOpenedChannel(data[0].parentId)
  }, [])

  const setToAnswers = useCallback((data) => {
    setOpenedThread(null)
    setAnswers([])

    console.log(data)
    const openedThread = threads.find(
      (thread) => thread.id===data[0].parentId)
    //console.log(openedThread)
    //console.log('here 2')
    if(data[0].text){
      setAnswers(data)
    }
    setOpenedThread(openedThread)
  }, [threads])

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

  const setToUser = useCallback((user) => {
    setUser(user)
  }, [])

  const setToChannels = (channels) => {
    setChannels(channels)
  }

  const logOut = () => {
    setAnswers([])
    setOpenedThread(null)
    setThreads([])
    setOpenedChannel(null)
    setChannels([])
    setUser(null)
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
    appHandlers(socket, showNotification, setToUser, setToChannels, logOut)
  }, [setToUser])

  return (
    <div>
      <Header/>
      <Notification 
        message={notification.message} 
        color={notification.color}/>
      {!user ? 
      <LogInBox 
      su={setToUser}
      showNotification={showNotification} />
      :
      <div className='row'>
        <div id='channelColumn'>
          <UserInfo 
            user={user} 
            logOut={logOut} 
            showNotification={showNotification} 
          />
          <Channels 
            channels={channels}
            st={setToThreads}
            ct={closeThreads}
            openedChannel={openedChannel} 
          />
        </div>
        <div id='messageColumn'>
          {openedThread 
          ? 
          <div>
            <MessageBox 
              text={openedThread.text}
              votes={openedThread.votes}
              location={openedThread.location}
              color={openedThread.color}
              time={openedThread.time}
              messageType='OpenedThread'
              cm={closeAnswers}
            />
            <Messages
              messages={answers}
              color={openedThread.color}
              messageType='Answer'
              sm={setToAnswers} 
            />
            <NewMessageBox
              id={openedThread.id} 
              showNotification={showNotification}
              messageType='Answer'
            />
          </div>
          : 
          openedChannel 
          ?
          <div>
            <NewMessageBox
              id={openedChannel}
              showNotification={showNotification}
              messageType='Thread'
            />
            <Messages 
              messages={threads}
              messageType='Thread'
              sm={setToAnswers} 
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