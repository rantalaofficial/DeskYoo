import ApiNames from './ApiNames'

const appHandlers = (socket, showNotification, setUser, setChannels, logOut) => {

//CONNECTION HANDLING
socket.on('connect_error', function(){
    showNotification("Cannot connect to server", 'red')
  });

  socket.on('disconnect', () => {
    showNotification("Server disconnected", 'red')
    logOut()
  })

  socket.on("*",(event, data) => {
    console.log(`EVENT: ${event} DATA: `);
    console.log(data)
  });

  //ERROR HANDLING
  socket.on(ApiNames.UserError, errorText => {
    document.getElementById('root').style.pointerEvents = 'auto'
    
    showNotification(errorText, 'red')
  })

  //USER LOGIN HANDLING
  socket.on(ApiNames.UserNotLogged, () => {
    document.getElementById('root').style.pointerEvents = 'auto'

    showNotification("User logged out.", 'red')
  });

  socket.on(ApiNames.UserDisplayInfo, user => {
    document.getElementById('root').style.pointerEvents = 'auto'

    setUser(user)
  })

  socket.on(ApiNames.ChannelsDisplayInfo, data => {
    document.getElementById('root').style.pointerEvents = 'auto'
    
    setChannels(data)
  })
}

export default appHandlers