import React from 'react'

import { useSelector } from 'react-redux'

import UserInfo from '../../components/boxes/UserInfo'
import Channels from '../../components/holders/Channels'
import AnswersBlock from '../../components/blocks/AnswersBlock'
import ThreadsBlock from '../../components/blocks/ThreadsBlock'

const ContentBlock = (props) => {
  const loggedIn = useSelector(state => state.userReducer.loggedIn)
  return (
    <div>
      {loggedIn ?
      <div className='row'>
        <div id='channelColumn'>
          <UserInfo/>
          <Channels/>
        </div>
        <div id='messageColumn'>
          <AnswersBlock />
          <ThreadsBlock />
        </div>
      </div>
      :
      null
    }
    </div>
  )
}

export default ContentBlock