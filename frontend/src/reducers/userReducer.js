const initialState = {
  data : {
    username: null,
    score: null
  },
  loggedIn: false,
  location: null
}

export const setUserInfo = (content) => {
    return {
        type: 'SET_USERINFO',
        content
    }
}

export const setLocation = (content) => {
    return {
        type: 'SET_LOCATION',
        content
    }
}

export const login = () => {
    return {
        type: 'LOGIN'
    }
}

export const logOut = () => {
    return {
        type: 'LOGOUT'
    }
}

const userReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case 'SET_USERINFO':
      newState.data = action.content

      return newState

    case 'SET_LOCATION':
      newState.location = action.content
  
      return newState

    case 'LOGIN':
      newState.loggedIn = true
      return newState

    case 'LOGOUT':
      return initialState

    default:
      return state
  }
}

export default userReducer