import {
  ALL_CHANNELS_FAIL,
  ALL_CHANNELS_REQUEST,
  ALL_CHANNELS_SUCCESS,
  CHANNELS_PROGRAM_FAIL,
  CHANNELS_PROGRAM_REQUEST,
  CHANNELS_PROGRAM_SUCCESS,
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  CHANNEL_SCHEDULE_FAIL,
  CHANNEL_SCHEDULE_REQUEST,
  CHANNEL_SCHEDULE_SUCCESS,
} from '../constants/channelConstants'

export const channelListReducer = (state = { channels: [] }, action) => {
  switch (action.type) {
    case ALL_CHANNELS_REQUEST:
      return { ...state, loading: true, channels: [] }
    case ALL_CHANNELS_SUCCESS:
      return { loading: false, channels: action.payload }
    case ALL_CHANNELS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const channelDetailsReducer = (state = { channel: {} }, action) => {
  switch (action.type) {
    case CHANNEL_DETAILS_REQUEST:
      return { ...state, loading: true }
    case CHANNEL_DETAILS_SUCCESS:
      return { loading: false, channel: action.payload }
    case CHANNEL_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const channelScheduleReducer = (state = { schedule: [] }, action) => {
  switch (action.type) {
    case CHANNEL_SCHEDULE_REQUEST:
      return { ...state, loading: true }
    case CHANNEL_SCHEDULE_SUCCESS:
      return { loading: false, schedule: action.payload }
    case CHANNEL_SCHEDULE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const channelsProgramReducer = (state = { programs: [] }, action) => {
  switch (action.type) {
    case CHANNELS_PROGRAM_REQUEST:
      return { ...state, loading: true }
    case CHANNELS_PROGRAM_SUCCESS:
      return { loading: false, programs: action.payload }
    case CHANNELS_PROGRAM_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
