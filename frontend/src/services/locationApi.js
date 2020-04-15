import axios from 'axios'

const getLocation = async (cb) => {
    navigator.geolocation.getCurrentPosition(
      async (data) => {
        //console.log(data.coords.latitude, data.coords.longitude)
        let position = [data.coords.latitude.toString(), data.coords.longitude.toString()]
        const response = await axios
        .get(`${process.env.REACT_APP_LOCATIONAPI}${position[0]}+${position[1]}&pretty=1&no_annotations=1`)
        const result = response.data.results[0] ? response.data.results[0].components : {}

        if(result.village){
          cb(result.village)
        }
        else if(result.town){
          cb(result.town)
        }
        else if(result.city){
          cb(result.city)
        }

        else if(result.country){
          cb(result.country)
        }
      },
      (error) => 
        console.log('Location not allowed'))
  }

const locationHelper = {
    getLocation
}

export default locationHelper