import { combineReducers } from 'redux'
import dataReducer from './dataReducer'
import userReducer from './userReducer'
import notificationReducer from './notificationReducer'

export default combineReducers({
  dataReducer,
  userReducer,
  notificationReducer
})