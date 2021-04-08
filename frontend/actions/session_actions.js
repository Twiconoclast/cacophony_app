import * as SessionsAPIUtil from '../util/sessions_api_util'
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS'
export const REMOVE_ERRORS = 'REMOVE_ERRORS'

const receiveCurrentUser = (user) => ({
    type: RECEIVE_CURRENT_USER,
    user
})

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
})

const receiveErrors = (errors) => ({
    type: RECEIVE_ERRORS,
    errors
})

export const removeErrors = () => ({
    type: REMOVE_ERRORS
})

export const createUser = user => (dispatch) => (
    SessionsAPIUtil.createUser(user).then((user) => dispatch(receiveCurrentUser(user))).catch(errors => dispatch(receiveErrors(errors)))
)

export const createSession = user => (dispatch) => (
    SessionsAPIUtil.createSession(user).then((user) => dispatch(receiveCurrentUser(user))).catch(errors => dispatch(receiveErrors(errors)))
)

export const deleteSession = () => (dispatch) => (
    SessionsAPIUtil.deleteSession().then(() => dispatch(logoutCurrentUser())).catch(errors => dispatch(receiveErrors(errors)))
)