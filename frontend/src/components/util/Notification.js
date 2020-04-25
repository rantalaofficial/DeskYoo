import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { resetNotification } from '../../reducers/notificationReducer'

const Notification = (props) => {
  const dispatch = useDispatch()
  const {message, color} = useSelector(state => state.notificationReducer)

  useEffect(() => {
    if(message) {
      setTimeout(() => {
        dispatch(resetNotification())
      }, 4000)
    }
  }, [dispatch, message])

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