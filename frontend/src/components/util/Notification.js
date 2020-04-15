import React from 'react'

const Notification = ({message, color}) => {
  const notificationStyle = {
    color: color,
    background: "white",

    fontSize: "20px",
    textAlign: "center",

    borderStyle: "solid",
    borderRadius: "5px",

    padding: "10px",
    paddingLeft: "0px",
    paddingRight: "0px",
    width: "50%",

    position: "absolute",
    left: "25%",
    right: "25%",
  }
  
    
    
  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification