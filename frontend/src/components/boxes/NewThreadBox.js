import React, {useState, useEffect} from 'react'
import apiHelper from '../../services/dataApi'
import axios from 'axios'

const NewThreadBox = ({st, openedChannel}) => {
  const [yoo, setYoo] = useState('')
  const [location, setLocation] = useState('')

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

  const getLocation = (position) => {
    return axios
    .get(`https://api.opencagedata.com/geocode/v1/json?key=1ed54d9bab024ae5a6caea8eb9b76d67&q=${position[0]}+${position[1]}&pretty=1&no_annotations=1`)
  }

  const handleYooSend = (event) => {
    event.preventDefault()
    console.log(yoo)

    console.log(location)
    if(location.length!==0){
      apiHelper.addThread([yoo, location, openedChannel])
    }
    else{
      apiHelper.addThread([yoo, 'Unknown', openedChannel])
    }

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