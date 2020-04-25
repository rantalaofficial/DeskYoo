import React, {useState, useEffect} from 'react'
import {sha256} from 'js-sha256'

import socket from '../../services/connect'

import { useSelector, useDispatch } from 'react-redux'

import { login } from '../../reducers/userReducer'

import { setNotification } from '../../reducers/notificationReducer'

const LogInBox = (props) => {
  const [logIn, setLogIn] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfpassword] = useState('')

  const loggedIn = useSelector(state => state.userReducer.loggedIn)

  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('LOGINSUCCESS', () => {
      dispatch(login())
      document.getElementById('root').style.pointerEvents = 'auto'

      socket.emit('GETUSERDISPLAYINFO')
      socket.emit('GETCHANNELSDISPLAYINFO')
    })

    socket.on('REGISTERSUCCESS', () => {
      setLogIn(true)
      document.getElementById('form').reset()
      document.getElementById('root').style.pointerEvents = 'auto'
    })

    return function cleanup () {
      socket.off('LOGINSUCCESS')
      socket.off('REGISTERSUCCESS')
    }
  }, [dispatch])

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    document.getElementById('root').style.pointerEvents = 'none'

    socket.emit('LOGIN', [username, sha256(password+process.env.REACT_APP_SECRET)])
  }
  
  const handleRegisterSubmit = (event) => {
    event.preventDefault()

    if(password===confPassword && password.length>4){
      document.getElementById('root').style.pointerEvents = 'none'

      socket.emit('REGISTER', [username, sha256(password+process.env.REACT_APP_SECRET)])
    }
    else if(password!==confPassword){
      dispatch(setNotification({message: 'Passwords don\'t match', color: 'red'}))
    }
    else if(password.length<5){
      dispatch(setNotification({message: 'Password too short', color: 'red'}))
    }
  }
  
  return(
    <div>
      {!loggedIn
      ?
      <div id="loginContainer">
        <form id='form' className='yellowBox LogIn' onSubmit={logIn ? handleLoginSubmit : handleRegisterSubmit}>
          <p><input placeholder='Username' className='LogInElement' type='text' onChange={(event) => setUsername(event.target.value)}></input></p>
          <p><input placeholder='Password' className='LogInElement' type='password' onChange={(event) => setPassword(event.target.value)}></input></p>
          {logIn ? null : <p><input placeholder='Password confirm' className='LogInElement' type='password' onChange={(event) => setConfpassword(event.target.value)}></input></p>}
          <input className='greenBox LogInElement' type='submit' onClick={() => dispatch(setNotification({message: logIn ? 'Login successful' : 'User creation successful', color: 'green'}))} value={logIn ? 'Login' : 'Register'} />
        </form>
        <input className='LogInElement' type='button' onClick={() => {
            setLogIn(logIn ? false : true)
            document.getElementById('form').reset()
            setUsername('')
            setPassword('')
            setConfpassword('')
            }} value={logIn ? 'Register' : 'Login'}></input>
      </div>
      :
      null
      }
    </div>
  )
}

export default LogInBox