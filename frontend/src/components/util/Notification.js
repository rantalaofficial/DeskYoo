import React from 'react'

const Notification = ({message, color}) => {
  const notificationStyle = {
    color: color,
    background: "white",

    fontSize: "20px",
    textAlign: "center",

    borderStyle: "solid",
    borderRadius: "10px",

    padding: "10px",
    paddingLeft: "0px",
    paddingRight: "0px",
    width: "40%",

    position: "absolute",
    left: "30%",
    right: "30%",
    top: "120px",

    opacity: "0.7",
    zIndex: "10",
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