import React, { useEffect } from 'react'
import './App.css'

import { useDispatch } from 'react-redux'

import Header from './components/boxes/Header'
import Notification from './components/util/Notification'
import LogInBox from './components/boxes/LogInBox'
import ContentBlock from './components/blocks/ContentBlock'

import socket from './services/connect'
import appHandlers from './services/appEvents'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    appHandlers(socket, dispatch)
  }, [dispatch])

  return (
    <div>
      <Header/>
      <Notification/>
      <LogInBox/>
      <ContentBlock />
    </div>
  )
}

export default App;