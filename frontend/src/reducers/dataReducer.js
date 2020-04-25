const initialState = {
  answers: [],
  openedThread: null,
  threads: [],
  openedChannel: null,
  channels: []
}

export const setChannels = (content) => ({type: 'SET_CHANNELS', content})
export const setThreads = (content) => ({type: 'SET_THREADS', content})
export const setAnswers = (content) => ({type: 'SET_ANSWERS', content})
export const closeThreads = () => ({type: 'CLOSE_THREADS'})
export const closeAnswers = () => ({type: 'CLOSE_ANSWERS'})
export const logOutData = () => ({type: 'LOGOUTDATA'})


const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHANNELS':
      return {...state, channels: action.content}

    case 'SET_THREADS':
      const newOpenedThread = state.openedThread ? action.content.find((thread) =>
        thread.id===state.openedThread.id) : null

      const newThreads = action.content[0].text ? action.content : []

      return {...state, answers: [], openedThread: newOpenedThread, threads: newThreads, openedChannel: action.content[0].parentId}

    case 'SET_ANSWERS':
      const newOpenedThread2 = state.threads.find(
        (thread) => thread.id===action.content[0].parentId)

      const newAnswers = action.content[0].text ? action.content : []

      return {...state, answers: newAnswers, openedThread: newOpenedThread2}

    case 'CLOSE_THREADS':
      return {...state, answers: [], openedThread: null, threads: [], openedChannel: null}

    case 'CLOSE_ANSWERS':
      return {...state, answers: [], openedThread: null}

    case 'LOGOUTDATA':
      return initialState

    default:
      return state
    }
}

export default dataReducer