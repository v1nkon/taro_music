import { combineReducers } from 'redux'
import homeReducer from './home'
import songListReducer from './songlist'
import songReducer from './song'

const reducers = combineReducers({
  homeReducer,
  songListReducer,
  songReducer
})

export default reducers