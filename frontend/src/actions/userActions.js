import axios from 'axios'
import {
  USER_ADD_FAV_FAIL,
  USER_ADD_FAV_REQUEST,
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

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users',
      { username, email, password },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')

  dispatch({ type: USER_LOGOUT })
}

export const updateUser =
  (username, password) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_EDIT_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.put('/api/users/edit', { username, password }, config)
      dispatch({
        type: USER_EDIT_SUCCESS,
      })
      localStorage.setItem(
        'userInfo',
        JSON.stringify({ ...userInfo, username: username })
      )
    } catch (error) {
      dispatch({
        type: USER_EDIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
export const addFav = (favChannel) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADD_FAV_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post('/api/users/favList', favChannel, config)

    dispatch({
      type: USER_ADD_FAV_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: USER_ADD_FAV_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const removeFav = (favId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_FAV_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put('/api/users/delete', favId, config)

    dispatch({
      type: USER_DELETE_FAV_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAV_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getFav = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_GET_FAV_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get('/api/users/favList', config)
    dispatch({
      type: USER_GET_FAV_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_GET_FAV_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
