const appHandlers = (socket, showNotification, setUser, setChannels) => {

//CONNECTION HANDLING
socket.on('connect_error', function(){
    showNotification("Cannot connect to server", 'red')
  });

  socket.on('disconnect', () => {
    showNotification("Server disconnected", 'red')
  })

  socket.on("*",(event, data) => {
    console.log(`EVENT: ${event} DATA: `);
    console.log(data)
  });

  //ERROR HANDLING
  socket.on('USERERROR', errorText => {
    document.getElementById('root').style.pointerEvents = 'auto'
    
    showNotification(errorText, 'red')
  })

  //USER LOGIN HANDLING
  socket.on('USERDISPLAYINFO', user => {
    document.getElementById('root').style.pointerEvents = 'auto'

    setUser(user)
  })

  socket.on('CHANNELSDISPLAYINFO', data => {
    document.getElementById('root').style.pointerEvents = 'auto'
    
    setChannels(data)
  })
}

export default appHandlers