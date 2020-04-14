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
    <form className='greenBox message' onSubmit={handleYooSend}>
      New Yoo
      <br></br>
      <input id='texti' placeholder='Yoo' type='text' onChange={(event) => setYoo(event.target.value)}></input>
      <input type='submit' value='Send Yoo'></input>
    </form>
  )
}

export default NewThreadBox