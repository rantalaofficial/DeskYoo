const initialState = {
  message: null,
  color : 'green'
}

export const setNotification = (content) => ({type: 'SET_NOTIFICATION', content})
export const resetNotification = () => ({type: 'RESET_NOTIFICATION'})

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {...action.content}

    case 'RESET_NOTIFICATION':
      return initialState

    default:
      return state
  }
}

export default notificationReducer