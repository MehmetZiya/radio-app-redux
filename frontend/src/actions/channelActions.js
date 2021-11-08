import axios from 'axios'
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

export const getChannelSchedule = (id) => async (dispatch) => {
  try {
    dispatch({ type: CHANNEL_SCHEDULE_REQUEST })

    const { data } = await axios.get(
      `http://api.sr.se/api/v2/scheduledepisodes?format=json&pagination=false&channelId=${id}`
    )
    dispatch({
      type: CHANNEL_SCHEDULE_SUCCESS,
      payload: data.schedule,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: CHANNEL_SCHEDULE_FAIL,
      payload: message,
    })
  }
}

export const getChannelsProgram = (id) => async (dispatch) => {
  try {
    dispatch({ type: CHANNELS_PROGRAM_REQUEST })

    const { data } = await axios.get(
      `http://api.sr.se/api/v2/programs/index?channelid=${id}&format=json&pagination=false`
    )
    dispatch({
      type: CHANNELS_PROGRAM_SUCCESS,
      payload: data.programs,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: CHANNELS_PROGRAM_FAIL,
      payload: message,
    })
  }
}
