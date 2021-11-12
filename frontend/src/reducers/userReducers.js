import {
  USER_ADD_FAV_FAIL,
  USER_ADD_FAV_REQUEST,
  USER_ADD_FAV_RESET,
  USER_ADD_FAV_SUCCESS,
  USER_DELETE_FAV_FAIL,
  USER_DELETE_FAV_REQUEST,
  USER_DELETE_FAV_SUCCESS,
  USER_EDIT_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_GET_FAV_FAIL,
  USER_GET_FAV_REQUEST,
  USER_GET_FAV_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userEditReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_EDIT_REQUEST:
      return { loading: true }
    case USER_EDIT_SUCCESS:
      return { loading: false, success: true }
    case USER_EDIT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userAddFavReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_ADD_FAV_REQUEST:
      return { loading: true }
    case USER_ADD_FAV_SUCCESS:
      return { loading: false, success: true }
    case USER_ADD_FAV_FAIL:
      return { loading: false, success: false, error: action.payload }
    case USER_ADD_FAV_RESET:
      return {}
    default:
      return state
  }
}

export const userDeleteFavReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DELETE_FAV_REQUEST:
      return { loading: true }
    case USER_DELETE_FAV_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAV_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userGetFavReducer = (state = { favList: [] }, action) => {
  switch (action.type) {
    case USER_GET_FAV_REQUEST:
      return { ...state, loading: true, favList: [] }
    case USER_GET_FAV_SUCCESS:
      return { loading: false, favList: action.payload }
    case USER_GET_FAV_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
