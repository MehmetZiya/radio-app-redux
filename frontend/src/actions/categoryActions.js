import axios from 'axios'
import {
  ALL_CATEGORIES_FAIL,
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  PROGRAMS_BY_CATEGORY_REQUEST,
  PROGRAMS_BY_CATEGORY_SUCCESS,
  PROGRAMS_BY_CATEGORY_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
} from '../constants/categoryConstants'

export const allCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORIES_REQUEST })

    const { data } = await axios.get(
      `http://api.sr.se/api/v2/programcategories?format=json`
    )
    dispatch({
      type: ALL_CATEGORIES_SUCCESS,
      payload: data.programcategories,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ALL_CATEGORIES_FAIL,
      payload: message,
    })
  }
}
export const getCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DETAILS_REQUEST })

    const { data } = await axios.get(
      `http://api.sr.se/api/v2/programcategories/${id}?format=json`
    )
    dispatch({
      type: CATEGORY_DETAILS_SUCCESS,
      payload: data.programcategory,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const getProgramsByCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROGRAMS_BY_CATEGORY_REQUEST })

    const { data } = await axios.get(
      `http://api.sr.se/api/v2/programs/index?format=json&pagination=false&programcategoryid=${id}`
    )
    dispatch({
      type: PROGRAMS_BY_CATEGORY_SUCCESS,
      payload: data.programs,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: PROGRAMS_BY_CATEGORY_FAIL,
      payload: message,
    })
  }
}
