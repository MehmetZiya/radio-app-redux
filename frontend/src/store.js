import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer } from './reducers/userReducers'
import {
  channelListReducer,
  channelDetailsReducer,
} from './reducers/channelReducers'
import {
  programListReducer,
  programDetailsReducer,
} from './reducers/programReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,

  channelList: channelListReducer,
  channelDetails: channelDetailsReducer,

  programList: programListReducer,
  programDetails: programDetailsReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const middleware = [thunk]

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
