import React, {useState, useEffect} from 'react'

import socket from '../../services/connect'

import { useSelector, useDispatch } from 'react-redux'

import { setNotification } from '../../reducers/notificationReducer'

import ApiNames from '../../services/ApiNames'

const NewMessageBox = ({id, messageType}) => {
  const [messageText, setMessageText] = useState('')

  const location = useSelector(state => state.userReducer.location)

  const dispatch = useDispatch()

  useEffect(() => {
    socket.on(messageType==='Answer' ? ApiNames.AddAnswerSuccess : ApiNames.AddThreadSuccess, () => {
      document.getElementById('root').style.pointerEvents = 'auto'
      socket.emit(messageType==='Answer' ? ApiNames.GetAnswersDisplayInfo : ApiNames.GetThreadsDisplayInfo, id)
    })
    
    return function cleanup () {
      messageType==='Answer' ? socket.off(ApiNames.AddAnswerSuccess) : socket.off(ApiNames.AddThreadSuccess)
    }
  }, [id, messageType])

  const handleMessageSend = (event) => {
    event.preventDefault()

    if(messageText.length>0){
      document.getElementById('root').style.pointerEvents = 'none'

      const handler = messageType==='Answer' ? ApiNames.AddAnswer : ApiNames.AddThread

      socket.emit(handler, [messageText, location && location.length!==0 ? location : 'Unknown', id])
    }
    else{
      dispatch(setNotification({message: 'Yoo can\'t be empty', color: 'red'}))
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