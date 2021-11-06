import {
  ALL_CHANNELS_FAIL,
  ALL_CHANNELS_REQUEST,
  ALL_CHANNELS_SUCCESS,
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
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
