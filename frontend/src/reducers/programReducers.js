import {
  ALL_PROGRAMS_FAIL,
  ALL_PROGRAMS_REQUEST,
  ALL_PROGRAMS_SUCCESS,
  PROGRAM_DETAILS_FAIL,
  PROGRAM_DETAILS_REQUEST,
  PROGRAM_DETAILS_SUCCESS,
} from '../constants/programConstants'

export const programListReducer = (state = { programs: [] }, action) => {
  switch (action.type) {
    case ALL_PROGRAMS_REQUEST:
      return { ...state, loading: true, programs: [] }
    case ALL_PROGRAMS_SUCCESS:
      return { loading: false, programs: action.payload }
    case ALL_PROGRAMS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const programDetailsReducer = (state = { program: {} }, action) => {
  switch (action.type) {
    case PROGRAM_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PROGRAM_DETAILS_SUCCESS:
      return { loading: false, program: action.payload }
    case PROGRAM_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
