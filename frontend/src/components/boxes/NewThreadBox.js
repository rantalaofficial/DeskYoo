import React, {useState} from 'react'
import apiHelper from '../../services/dataApi'

const NewThreadBox = ({st, openedChannel}) => {
  const [yoo, setYoo] = useState('')

  const handleYooSend = (event) => {
    event.preventDefault()
    console.log(yoo)
    apiHelper.addThread([yoo, 'WonderLand', openedChannel])

    apiHelper.getThreadDisplayInfo(openedChannel, data => {
        st(data)
      })
    setYoo('')
    document.getElementById('texti').value=''
  }

  return (
    <div className="greenBox message">
      <form className='' onSubmit={handleYooSend}>
      <textarea className="messageInputTextBox" id='texti' maxLength="300" placeholder='Write your Yoo here and press 🤟 to send!' type='text' onChange={(event) => setYoo(event.target.value)}></textarea>
      <button className="sendMessageBtn" type='submit' value=''>
        <img src="/logo192.png" width='58px;' height='58px'></img>
      </button>
    </form>
    </div>
    
  )
}

export default NewThreadBox