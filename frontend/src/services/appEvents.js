import { setNotification } from '../reducers/notificationReducer'

import { setUserInfo, logOut } from '../reducers/userReducer'

import { setChannels, logOutData } from '../reducers/dataReducer'

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
    console.log(`EVENT: ${event} DATA: `)
    console.log(data)
  })

  //ERROR HANDLING
  socket.on('USERERROR', errorText => {
    document.getElementById('root').style.pointerEvents = 'auto'
    
    dispatch(setNotification({message: errorText, color: 'red'}))
  })

  //USER LOGIN HANDLING
  socket.on('USERNOTLOGGED', () => {
    document.getElementById('root').style.pointerEvents = 'auto'

    dispatch(setNotification({message: "User logged out.", color: 'red'}))
  });

  socket.on('USERDISPLAYINFO', user => {
    document.getElementById('root').style.pointerEvents = 'auto'

    dispatch(setUserInfo(user))
  })

  socket.on('CHANNELSDISPLAYINFO', data => {
    document.getElementById('root').style.pointerEvents = 'auto'
    
    dispatch(setChannels(data))
  })
}

export default appHandlers