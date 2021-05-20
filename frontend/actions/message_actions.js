import * as MessageAPIUtils from '../util/messages_api_util'
export const RECEIVE_MESSAGES= 'RECEIVE_MESSAGES'
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE'
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS'
export const REMOVE_ERRORS = 'REMOVE_ERRORS'

const receiveMessages = (messages) => ({
    type: RECEIVE_MESSAGES,
    messages
})

const receiveMessage = (message) => ({
    type: RECEIVE_MESSAGE,
    message
})

const removeMessage = (messageId) => ({
    type: REMOVE_MESSAGE,
    messageId
})

const receiveErrors = (errors) => ({
    type: RECEIVE_ERRORS,
    errors
})

export const removeErrors = () => ({
    type: REMOVE_ERRORS
})

export const fetchMessages = (channel_id) => (dispatch) => (
    MessageAPIUtils.fetchMessages(channel_id).then((messages) => dispatch(receiveMessages(messages)))
)

export const fetchMessage = (messageId) => (dispatch) => (
    MessageAPIUtils.fetchMessage(messageId).then((message) => dispatch(receiveMessage(message))).catch(errors => dispatch(receiveErrors(errors)))
)

export const createMessage = (message) => (dispatch) => (
    MessageAPIUtils.createMessage(message).then((message) => dispatch(receiveMessage(message))).catch(errors => dispatch(receiveErrors(errors)))
)

export const updateMessage = (message) => (dispatch) => (
    MessageAPIUtils.updateMessage(message).then((message) => dispatch(receiveMessage(message))).catch(errors => dispatch(receiveErrors(errors)))
)

export const deleteMessage = (messageId) => (dispatch) => (
    MessageAPIUtils.deleteMessage(messageId).then((messageId) => dispatch(removeMessage(messageId))).catch(errors => dispatch(receiveErrors(errors)))
)