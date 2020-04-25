const initialState = {
  data : {
    username: null,
    score: null
  },
  loggedIn: false,
  location: null
}

export const setUserInfo = (content) => ({type: 'SET_USERINFO', content})
export const setLocation = (content) => ({type: 'SET_LOCATION', content})
export const login = () => ({type: 'LOGIN'})
export const logOut = () => ({type: 'LOGOUT'})

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERINFO':
      return {...state, data: action.content}

    case 'SET_LOCATION':
      return {...state, location: action.content}

    case 'LOGIN':
      return {...state, loggedIn: true}

    case 'LOGOUT':
      return initialState

    default:
      return state
  }
}

export default userReducer