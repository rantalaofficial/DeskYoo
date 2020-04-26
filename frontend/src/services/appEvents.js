import { setNotification } from '../reducers/notificationReducer'
import { logOut } from '../reducers/userReducer'
import { logOutData } from '../reducers/dataReducer'

import ApiNames from './ApiNames'

const appHandlers = (socket, dispatch) => {

  //CONNECTION HANDLING
  socket.on('connect_error', function(){
    dispatch(setNotification({message: 'Cannot connect to server', color: 'red'}))
  })

  socket.on('disconnect', () => {
    dispatch(setNotification({message: "Server disconnected", color: 'red'}))
    dispatch(logOut())
    dispatch(logOutData())
  })

  socket.on("*",(event, data) => {
    console.log(`EVENT: ${Object.keys(ApiNames).find(key => ApiNames[key] === event)} DATA: `)
    console.log(data)
  })

  //ERROR HANDLING
  socket.on(ApiNames.UserError, errorText => {
    document.getElementById('root').style.pointerEvents = 'auto'
    
    dispatch(setNotification({message: errorText, color: 'red'}))
  })

  //USER LOGIN HANDLING
  socket.on(ApiNames.UserNotLogged, () => {
    document.getElementById('root').style.pointerEvents = 'auto'

    dispatch(setNotification({message: "User logged out.", color: 'red'}))
  });
}

export default appHandlers