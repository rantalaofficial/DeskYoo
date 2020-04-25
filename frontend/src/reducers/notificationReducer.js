const initialState = {
  message: null,
  color : 'green'
}

export const setNotification = (content) => {
  return {
    type: 'SET_NOTIFICATION',
    content
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION',
  }
}

const notificationReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case 'SET_NOTIFICATION':
      newState.message = action.content.message
      newState.color = action.content.color

      return newState

    case 'RESET_NOTIFICATION':
      return initialState

    default:
      return state
  }
}

export default notificationReducer