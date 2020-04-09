import React, {useState, useEffect} from 'react'
import './App.css'
import {getChannelDisplayInfo} from './services/api'

const Bar = () => (
  <div>
    <h2 id='bar'>DeskYoo</h2>
    <h2 id='bar2'>Better than Jodel</h2>
  </div>
)

const UserInfo = ({user}) => (
  <div id='userInfo'>
    <p>{user.points} Yoo Points</p>
    <p>UserID: {user.id}</p>
  </div>
)

const MessageBox = ({text, author, location}) => (
    <p className='message'>{text} @{author} {location}</p>
)

const Messages = ({messages}) => (
  <div>
    {messages.map((message, i) =>
      <MessageBox key={i} 
      text={message.text} 
      author={message.author}
      location={message.location}
      />
    )}
  </div>
)

const ChannelBox = ({id, name, followers}) => (
  <button onClick={e => handleChannelClick(e, id)} className='channelInfo'>
    <div>
     <p><b>{name}</b> {followers} </p>
    </div>
  </button>
)

const handleChannelClick = (event, id) => {
  event.preventDefault()
  console.log(id)
}

const Channels = ({channels}) => {
  if(channels){
    return(
      <div>
        {channels.map((channel, i) =>
          <ChannelBox key={i}
          id={i} 
          name={channel.name} 
          followers={channel.followers}
          />
        )}
      </div>
    )
  }
  else{
    return(
      <div>

      </div>
    )
  }
}

const testMessages = [{
  text: 'DeskYoo is better than Jodel',
  author: '1',
  location: 'Turku'
},
{
  text: 'DeskYoo is better than Jodel',
  author: '1',
  location: 'Turku'
},
{
  text: 'DeskYoo is better than Jodel',
  author: '1',
  location: 'Turku'
}]

const testChannels = [{
  name: 'Kerttuli',
  followers: 1000,
  id: 1
},
{
  name: 'Aalto',
  followers: 3000,
  id: 2
},
{
  name: 'seksi',
  followers: 69420,
  id: 3
}]

const testUser = {
  points: 2000,
  id: 69
}

const App = () => {
  const [messages, setMessages] = useState([])
  const [threads, setThreads] = useState([])
  const [channels, setChannels] = useState([])
  const [user, setUser] = useState(testUser)

  useEffect(() => {
    getChannelDisplayInfo((data) => setChannels(data))
  },[])

  return (
    <div>
      <Bar />
      <div className='row'>
        <div id='channelColumn'>
          <UserInfo user={user} />
          <Channels channels={channels} />
        </div>
        <div id='messageColumn'>
          <Messages messages={messages} />
        
          {/*{messages 
          ? 
          <Messages messages={messages} />
          : 
          <Threads threads={threads} />}*/}
        </div>
      </div>
    </div>
  )
}

export default App;