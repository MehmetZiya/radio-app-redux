import axios from 'axios'
import {
  ALL_PROGRAMS_FAIL,
  ALL_PROGRAMS_REQUEST,
  ALL_PROGRAMS_SUCCESS,
  PROGRAM_DETAILS_FAIL,
  PROGRAM_DETAILS_REQUEST,
  PROGRAM_DETAILS_SUCCESS,
} from '../constants/programConstants'

export const allPrograms = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PROGRAMS_REQUEST })

    const { data } = await axios.get(
      `http://api.sr.se/api/v2/programs?format=json&pagination=false`
    )
    dispatch({
      type: ALL_PROGRAMS_SUCCESS,
      payload: data.programs,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ALL_PROGRAMS_FAIL,
      payload: message,
    })
  }
}

export const getProgramDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROGRAM_DETAILS_REQUEST })

    const { data } = await axios.get(
      `http://api.sr.se/api/v2/programs/${id}?format=json`
    )
    dispatch({
      type: PROGRAM_DETAILS_SUCCESS,
      payload: data.program,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: PROGRAM_DETAILS_FAIL,
      payload: message,
    })
  }
}
