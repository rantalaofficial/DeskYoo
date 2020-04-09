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

const MessageBox = ({text, likes, location}) => (
    <div className='greenBox message'>
      <p>{text} @{likes} {location}</p>
    </div>
)

const Messages = ({messages}) => (
  <div>
    {messages.map((message, i) =>
      <MessageBox key={i} 
      text={message.text} 
      likes={message.likes}
      location={message.location}
      />
    )}
  </div>
)

const ThreadBox = ({channelId, threadId, text, likes, location, sm}) => {
  const colorPicker = Math.floor(Math.random()*5)

  const colors=[
    ['#e75656', ' #e70b0b'],
    ['#d62f2f', ' #d67a7a'],
    ['#bf1d66', ' #bf68b0'],
    ['#c92e55', ' #c979a0'],
    ['#de2a54', ' #de75aa']]

  const bc=colors[colorPicker][0]
  const br=('2px solid').concat(colors[colorPicker][1])


  const styles = {
    backgroundColor: bc,
    border: br,
    textAlign: 'left',
    padding: '2%',
    width: '90%',
    borderRadius: '10px',
    marginTop: '0%',
    marginLeft: '0%',
    marginRight: '0%',
    marginBottom: '3%'
  }

  return (
    <div>
      <button onClick={e => handleThreadClick(e, channelId, threadId, sm)}  style={styles} className='message'>  
        <span> {text} 👤</span><br></br>
        <span>📍{location}</span>
      </button>
      <div className="messageLikeContainer">
        <button className="likeButton">▲</button>
        <p id="likeText">{likes}</p>
        <button className="likeButton">▼</button>
      </div>
    </div>
  )
}

const handleThreadClick = (event, channelId, threadId, sm) => {
  event.preventDefault()
  console.log(channelId)
  apiHelper.getAnswersDisplayInfo(channelId, threadId, (data) => {
    console.log(data)
    data.map(message => {
      message.threadId=threadId
      message.channelId=channelId
    })
    sm(data)
  })
}

const Threads = ({threads, sm}) => (
<div>
  {threads.map((thread, i) =>
    <ThreadBox key={i}
    channelId={thread.channelId}
    threadId={i} 
    text={thread.text} 
    likes={thread.likes}
    location={thread.location}
    sm={sm}
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
    data.map(thread => {
      thread.channelId=id
    })
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

const OpenedThreadBox = ({text, likes, location, cm}) => {
  const colorPicker = Math.floor(Math.random()*5)

  const colors=[
    ['#e75656', ' #e70b0b'],
    ['#d62f2f', ' #d67a7a'],
    ['#bf1d66', ' #bf68b0'],
    ['#c92e55', ' #c979a0'],
    ['#de2a54', ' #de75aa']]

  const bc=colors[colorPicker][0]
  const br=('2px solid').concat(colors[colorPicker][1])


  const styles = {
    backgroundColor: bc,
    border: br,
    textAlign: 'left',
    padding: '2%',
    width: '90%',
    borderRadius: '10px',
    margin: '0%'
  }

  return (
    <div>
      <button onClick={e => handleOpenedThreadClick(e, cm)}  style={styles} className='message'>
        <span> {text} 👤</span><br></br>
        <span>📍{location}</span>
      </button>
      <div className="messageLikeContainer">
        <button className="likeButton">▲</button>
        <p id="likeText">{likes}</p>
        <button className="likeButton">▼</button>
      </div>
    </div>
  )
}

const handleOpenedThreadClick = (event, cm) => {
  event.preventDefault()
  cm()
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
    console.log('here')
    setThreads(data)
  }

  const setToMessages = (data) => {
    console.log('here 2')
    setMessages(data)
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
            text={threads[messages[0].threadId].text} 
            likes={threads[messages[0].threadId].likes} 
            location={threads[messages[0].threadId].location}
            cm={closeMessages}
            />
            <Messages messages={messages} />
          </div>
          : 
          <Threads threads={threads} sm={setToMessages} />}
        </div>
      </div>
    </div>
  )
}

export default App;