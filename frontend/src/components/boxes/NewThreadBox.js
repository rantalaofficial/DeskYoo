import React, {useState, useEffect} from 'react'
import apiHelper from '../../services/dataApi'
import axios from 'axios'

const NewThreadBox = ({st, openedChannel}) => {
  const [yoo, setYoo] = useState('')
  const [location, setLocation] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        async (data) => {
          console.log(data.coords.latitude, data.coords.longitude)
          let position = [data.coords.latitude.toString(), data.coords.longitude.toString()]
          const response = await getLocation(position)
          setLocation(response.data.results[0].components.town)
        },
        (error) => 
          console.log('Location not allowed'))}
    ,[])

  const getLocation = async (position) => {
    return await axios
    .get(`https://api.opencagedata.com/geocode/v1/json?key=1ed54d9bab024ae5a6caea8eb9b76d67&q=${position[0]}+${position[1]}&pretty=1&no_annotations=1`)
  }

  const handleYooSend = (event) => {
    event.preventDefault()
    console.log(yoo)

    console.log(location)
    if(location && location.length!==0){
      apiHelper.addThread([yoo, location, openedChannel], openedChannel, st)
    }
    else{
      apiHelper.addThread([yoo, 'Unknown', openedChannel], openedChannel, st)
    }

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