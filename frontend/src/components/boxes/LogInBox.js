import React, {useState} from 'react'
import userHelper from '../../services/userApi'

const LogInBox = ({su}) => {
  const [logIn, setLogIn] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfpassword] = useState('')

  const handleLoginSubmit = (event, su) => {
    event.preventDefault()
      
    console.log(username, password)
  
    userHelper.login([username, password], user => su(user))
  }
  
  const handleRegisterSubmit = (event) => {
    event.preventDefault()

    console.log(username, password, confPassword)
    
    userHelper.register([username, password, confPassword]).then(userId =>{
        if(userId){
          console.log(`Register success, ID ${userId}`)
          this.setLogIn(true)
        }
        else{
          console.log('Register failed')
        }
    })
  }
  
  return(logIn ?
    <div id="loginContainer">
      <form id='loginForm' className='yellowBox LogIn' onSubmit={(event) => handleLoginSubmit(event, su)}>
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