import React, { useEffect } from 'react'

import socket from '../../services/connect'

import { useSelector, useDispatch } from 'react-redux'

import { setUserInfo, logOut } from '../../reducers/userReducer'

import { logOutData } from '../../reducers/dataReducer'

import { setNotification } from '../../reducers/notificationReducer'

import ApiNames from '../../services/ApiNames'

const UserInfo = (props) => {
  const user = useSelector(state => state.userReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    socket.on(ApiNames.UserDisplayInfo, user => {
      document.getElementById('root').style.pointerEvents = 'auto'
  
      dispatch(setUserInfo(user))
    })
  }, [dispatch])

  return(
    user.loggedIn ?
    <div className='yellowBox' id='UserInfo'>
      <p>Username: {user.data.username}</p>
      <p>{user.data.score} Yoo Points</p>
      <input style={{backgroundColor: '#F05035', border: '2px solid gray'}} className='LogInElement' type='button' value='Logout' onClick={() => {
        socket.emit(ApiNames.Logout)
        dispatch(logOut())
        dispatch(logOutData())

        dispatch(setNotification({message: 'Logged out', color: 'green'}))
        }}>
      </input>
    </div>
    :
    null
  )
}

export default UserInfo