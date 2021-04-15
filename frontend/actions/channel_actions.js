import * as ChannelAPIUtils from '../util/channels_api_util'
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS'
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL'
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL'
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS'
export const REMOVE_ERRORS = 'REMOVE_ERRORS'

const receiveChannels = (channels) => ({
    type: RECEIVE_CHANNELS,
    channels
})

const receiveChannel = (channel) => ({
    type: RECEIVE_CHANNEL,
    channel
})

const removeChannel = (channelId) => ({
    type: REMOVE_CHANNEL,
    channelId
})

const receiveErrors = (errors) => ({
    type: RECEIVE_ERRORS,
    errors
})

export const removeErrors = () => ({
    type: REMOVE_ERRORS
})

export const fetchChannels = (server_id) => (dispatch) => (
    ChannelAPIUtils.fetchChannels(server_id).then((channels) => dispatch(receiveChannels(channels)))
)

export const fetchChannel = (channelId, server_id) => (dispatch) => (
    ChannelAPIUtils.fetchChannel(channelId, server_id).then((channel) => dispatch(receiveChannel(channel))).catch(errors => dispatch(receiveErrors(errors)))
)

export const createChannel = (channel) => (dispatch) => (
    ChannelAPIUtils.createChannel(channel).then((channel) => dispatch(receiveChannel(channel))).catch(errors => dispatch(receiveErrors(errors)))
)

export const deleteChannel = (channelId) => (dispatch) => (
    ChannelAPIUtils.deleteChannel(channelId).then((channelId) => dispatch(removeChannel(channelId))).catch(errors => dispatch(receiveErrors(errors)))
)