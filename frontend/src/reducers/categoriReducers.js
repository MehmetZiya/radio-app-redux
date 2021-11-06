import {
  ALL_CATEGORIES_FAIL,
  ALL_CATEGORIES_REQUEST,
  ALL_CATEGORIES_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  PROGRAMS_BY_CATEGORY_FAIL,
  PROGRAMS_BY_CATEGORY_REQUEST,
  PROGRAMS_BY_CATEGORY_SUCCESS,
} from '../constants/categoryConstants'

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case ALL_CATEGORIES_REQUEST:
      return { ...state, loading: true, categories: [] }
    case ALL_CATEGORIES_SUCCESS:
      return { loading: false, categories: action.payload }
    case ALL_CATEGORIES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const categoryDetailsReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return { ...state, loading: true, category: {} }
    case CATEGORY_DETAILS_SUCCESS:
      return { loading: false, category: action.payload }
    case CATEGORY_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const programsByCategoryReducer = (state = { programs: [] }, action) => {
  switch (action.type) {
    case PROGRAMS_BY_CATEGORY_REQUEST:
      return { ...state, loading: true, programs: [] }
    case PROGRAMS_BY_CATEGORY_SUCCESS:
      return { loading: false, programs: action.payload }
    case PROGRAMS_BY_CATEGORY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
