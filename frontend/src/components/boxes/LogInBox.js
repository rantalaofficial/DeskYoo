import React, {useState, useEffect} from 'react'

import socket from '../../services/connect'

const LogInBox = ({su}) => {
  const [logIn, setLogIn] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfpassword] = useState('')

  const [registerSuccess, setRegisterSuccess] = useState(false)

  useEffect(() => {
    socket.on('LOGINSUCCESS', () => {
      su(true)
      document.getElementById('root').style.pointerEvents = 'auto'
    })

    socket.on('REGISTERSUCCESS', () => {
      setRegisterSuccess(true)
      document.getElementById('registerForm').reset()
      document.getElementById('root').style.pointerEvents = 'auto'
    })

    return function cleanup () {
      socket.off('LOGINSUCCESS')
      socket.off('REGISTERSUCCESS')
    }
  }, [])

  useEffect(() => {
    //TODO Client logging
    console.log('Register success')
    setLogIn(true)
  }, [registerSuccess])

  const handleLoginSubmit = (event, su) => {
    event.preventDefault()
    document.getElementById('root').style.pointerEvents = 'none'

    socket.emit('LOGIN', [username, password])
  }
  
  const handleRegisterSubmit = (event) => {
    event.preventDefault()
    document.getElementById('root').style.pointerEvents = 'none'

    if(password===confPassword){
      socket.emit('REGISTER', [username, password])
    }
    else{
      //CLIENT LOGGING
      console.log('Password don\'t match')
    }
  }
  
  return(logIn ?
    <div id="loginContainer">
      <form id='loginForm' className='yellowBox LogIn' onSubmit={handleLoginSubmit}>
        <p><input placeholder='Username' className='LogInElement' type='text' onChange={(event) => setUsername(event.target.value)}></input></p>
        <p><input placeholder='Password' className='LogInElement' type='password' onChange={(event) => setPassword(event.target.value)}></input></p>
        <input className='LogInElement' type='submit' value='Login' />
      </form>
      <input className='LogInElement' type='button' onClick={() => {
          setLogIn(false)
          document.getElementById('loginForm').reset()
          }} value='Register'></input>
    </div>
    : 
    <div id="loginContainer">
      <form id='registerForm' className='yellowBox LogIn' onSubmit={handleRegisterSubmit}> 
        <p><input placeholder='Username' className='LogInElement' type='text' onChange={(event) => setUsername(event.target.value)}></input></p>
        <p><input placeholder='Password' className='LogInElement' type='password' onChange={(event) => setPassword(event.target.value)}></input></p>
        <p><input placeholder='Password confirm' className='LogInElement' type='password' onChange={(event) => setConfpassword(event.target.value)}></input></p>
        <input className='LogInElement' type='submit' value='Register' />
      </form>
      <input className='LogInElement' type='button' onClick={() => {
          setLogIn(true)
          document.getElementById('registerForm').reset()
          }} value='Login'></input>
    </div>
  )
}

export default LogInBox