const initialState = {
  answers: [],
  openedThread: null,
  threads: [],
  openedChannel: null,
  channels: []
}

export const setChannels = (content) => {
    return {
        type: 'SET_CHANNELS',
        content
    }
}

export const setThreads = (content) => {
    return {
        type: 'SET_THREADS',
        content
    }
}

export const setAnswers = (content) => {
    return {
        type: 'SET_ANSWERS',
        content
    }
}

export const closeThreads = () => {
    return {
        type: 'CLOSE_THREADS',
    }
}

export const closeAnswers = () => {
    return {
        type: 'CLOSE_ANSWERS',
    }
}

export const logOutData = () => {
    return {
        type: 'LOGOUTDATA',
    }
}

const dataReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case 'SET_CHANNELS':
      newState.channels = action.content

      return newState

    case 'SET_THREADS':
      const newOpenedThread = newState.openedThread ? action.content.find((thread) =>
        thread.id===newState.openedThread.id) : null

      newState.openedThread = newOpenedThread

      newState.threads = []
      newState.answers = []

      //console.log(action.content)
      //console.log('here')
      if(action.content[0].text){
        newState.threads = action.content
      }
      newState.openedChannel = action.content[0].parentId

      return newState

    case 'SET_ANSWERS':
      newState.answers = []
    
      //console.log(action.content)
      const newOpenedThread2 = newState.threads.find(
        (thread) => thread.id===action.content[0].parentId)

      //console.log(openedThread)
      //console.log('here 2')
      if(action.content[0].text){
        newState.answers = action.content
      }
      newState.openedThread = newOpenedThread2

      return newState

    case 'CLOSE_THREADS':
      newState.threads = []
      newState.openedChannel = null
      newState.openedThread = null
      newState.answers = []

      return newState

    case 'CLOSE_ANSWERS':
      newState.answers = []
      newState.openedThread = null

      return newState

    case 'LOGOUTDATA':
      return initialState

    default:
      return state
    }
}

export default dataReducer