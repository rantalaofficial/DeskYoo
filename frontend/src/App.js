import React, {useState, useEffect} from 'react'
import './App.css'
import apiHelper from './services/api'

const Header = () => (
  <div className="greenBox" id="Header">
    <img src="https://raw.githubusercontent.com/UisDangerouz/DeskYoo/master/logo.png" alt="DeskYoo" width="400px" height="auto"></img>
  </div>
)

const UserInfo = ({user}) => (
  <div className="yellowBox" id="UserInfo">
    <p>{user.points} Yoo Points</p>
    <p>UserID: {user.id}</p>
  </div>
)

const MessageBox = ({text, author, location}) => (
    <p className='greenBox message'>{text} @{author} {location}</p>
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

const ThreadBox = ({text, likes, location}) => (
  <div className='redBox message'>
    <span>{text} 👤</span><br></br>
    <span>📍{location}</span>
  </div>
)

const Threads = ({threads}) => (
<div>
  {threads.map((thread, i) =>
    <ThreadBox key={i} 
    text={thread.text} 
    likes={thread.likes}
    location={thread.location}
    />
  )}
</div>
)

const ChannelBox = ({id, name, followers, st}) => (
  <button onClick={e => handleChannelClick(e, id, st)} className='greenBox channelInfo'>
     #<b>{name}</b><br></br>
     <span>{followers} 👤</span> 
  </button>
)

const handleChannelClick = (event, id, st) => {
  event.preventDefault()
  console.log(id)
  apiHelper.getThreadDisplayInfo(id, (data) => {
    console.log(data)
    st(data)
  })
}

const Channels = ({channels, st}) => {
  if(channels){
    return(
      <div>
        {channels.map((channel, i) =>
          <ChannelBox key={i}
          id={i} 
          name={channel.name} 
          followers={channel.followers}
          st={st}
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

  const setToThreads = (data) => {
    setThreads(data)
    console.log('here')
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
          <Channels channels={channels} st={setToThreads} />
        </div>
        <div id='messageColumn'>
          {messages.length!==0 
          ? 
          <Messages messages={messages} />
          : 
          <Threads threads={threads} />}
        </div>
      </div>
    </div>
  )
}

export default App;