import React, {useState, useEffect} from 'react'
import locationHelper from '../../services/locationApi'

import socket from '../../services/connect'

import ApiNames from '../../services/ApiNames'

const NewMessageBox = ({id, showNotification, messageType}) => {
  const [messageText, setMessageText] = useState('')
  const [location, setLocation] = useState(null)

  useEffect(() => {
    socket.on(messageType==='Answer' ? ApiNames.AddAnswerSuccess : ApiNames.AddThreadSuccess, () => {
      document.getElementById('root').style.pointerEvents = 'auto'
      socket.emit(messageType==='Answer' ? ApiNames.GetAnswersDisplayInfo : ApiNames.GetThreadsDisplayInfo, id)
    })
    
    return function cleanup () {
      messageType==='Answer' ? socket.off(ApiNames.AddAnswerSuccess) : socket.off(ApiNames.AddThreadSuccess)
    }
  }, [id, messageType])

  useEffect(() => {
    async function data () {
      locationHelper.getLocation((data) => setLocation(data))
    }
    data()
  }, [])

  const handleMessageSend = (event) => {
    event.preventDefault()

    if(messageText.length>0){
      document.getElementById('root').style.pointerEvents = 'none'

      const handler = messageType==='Answer' ? ApiNames.AddAnswer : ApiNames.AddThread

      socket.emit(handler, [messageText, location && location.length!==0 ? location : 'Unknown', id])
    }
    else{
      showNotification('Yoo can\'t be empty', 'red')
    }

    setMessageText('')
    document.getElementById('texti').value=''

  }

  const handleTextChange = (event) => {
    let text = event.target.value

    if(text.split('\n').length>4){
      document.getElementById('texti').value=messageText
      text=messageText

    }
    //console.log(text)

    setMessageText(text)
  }

  return (
    <div className="yellowBox message">
      <form onSubmit={handleMessageSend}>
        <table className='messageTable'>
          <tbody>
            <tr>
              <td className="infoCell">
                <textarea className="messageInputTextBox" id='texti' maxLength="300" placeholder={messageType==='Answer' ? 'Write your answer here and press 🤟 to send!' : 'Write your Yoo here and press 🤟 to send!'} type='text' onChange={handleTextChange}></textarea>
              </td>
              <td>
                <button className="sendMessageBtn" type='submit' value=''>
                  <img className="sendMessageBtnImage" src="/logo192.png" alt={messageType==='Answer' ? 'Send new answer' : 'Send new thread'}></img>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default NewMessageBox