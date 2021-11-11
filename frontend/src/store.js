import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userLoginReducer,
  userRegisterReducer,
  userEditReducer,
  userAddFavReducer,
  userDeleteFavReducer,
  userGetFavReducer,
} from './reducers/userReducers'
import {
  channelListReducer,
  channelDetailsReducer,
  channelScheduleReducer,
  channelsProgramReducer,
} from './reducers/channelReducers'
import {
  programListReducer,
  programDetailsReducer,
} from './reducers/programReducers'
import {
  categoryListReducer,
  categoryDetailsReducer,
  programsByCategoryReducer,
} from './reducers/categoriReducers'
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userEdit: userEditReducer,
  userAddFav: userAddFavReducer,
  userDeleteFav: userDeleteFavReducer,
  userGetFav: userGetFavReducer,

  channelList: channelListReducer,
  channelDetails: channelDetailsReducer,
  channelSchedule: channelScheduleReducer,
  channelsProgram: channelsProgramReducer,

  programList: programListReducer,
  programDetails: programDetailsReducer,

  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  programsByCategory: programsByCategoryReducer,
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
