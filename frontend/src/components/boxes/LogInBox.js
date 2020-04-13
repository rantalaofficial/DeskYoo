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
          console.log(`Login success, ID ${userId}`)
          this.setLogIn(true)
        }
        else{
          console.log('Login failed')
        }
    })
  }
  
  return(logIn ?
    <div>
    <form id='loginForm' className='yellowBox LogIn' onSubmit={(event) => handleLoginSubmit(event, su)}>
    <p>Username: <input className='LogInElement' type='text' onChange={(event) => setUsername(event.target.value)}></input></p>
    <p>Password: <input className='LogInElement' type='password' onChange={(event) => setPassword(event.target.value)}></input></p>
    <input className='LogInElement' type='submit' value='Login' />
    </form>
    <input className='LogInElement' type='button' onClick={() => {
        setLogIn(false)
        document.getElementById('loginForm').reset()
        }} value='Register'></input>
    </div>
    : 
    <div>
    <form id='registerForm' className='yellowBox LogIn' onSubmit={handleRegisterSubmit}> 
    <p>Username: <input className='LogInElement' type='text' onChange={(event) => setUsername(event.target.value)}></input></p>
    <p>Password: <input className='LogInElement' type='password' onChange={(event) => setPassword(event.target.value)}></input></p>
    <p>Confirm password: <input className='LogInElement' type='password' onChange={(event) => setConfpassword(event.target.value)}></input></p>
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