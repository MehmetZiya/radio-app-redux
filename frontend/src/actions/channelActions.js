import axios from 'axios'
import {
  ALL_CHANNELS_FAIL,
  ALL_CHANNELS_REQUEST,
  ALL_CHANNELS_SUCCESS,
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
} from '../constants/channelConstants'

export const allChannels = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CHANNELS_REQUEST })

    const { data } = await axios.get(
      `http://api.sr.se/api/v2/channels?format=json&pagination=false`
    )
    dispatch({
      type: ALL_CHANNELS_SUCCESS,
      payload: data.channels,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ALL_CHANNELS_FAIL,
      payload: message,
    })
  }
}

export const getChannelDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CHANNEL_DETAILS_REQUEST })

    const { data } = await axios.get(
      `http://api.sr.se/api/v2/channels/${id}?format=json`
    )
    dispatch({
      type: CHANNEL_DETAILS_SUCCESS,
      payload: data.channel,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: CHANNEL_DETAILS_FAIL,
      payload: message,
    })
  }
}
