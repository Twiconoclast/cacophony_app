import * as SessionsAPIUtil from '../util/sessions_api_util'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'

export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'

const receiveCurrentUser = (user) => {
    type: RECEIVE_CURRENT_USER,
    user
}

const logoutCurrentUser = () => {
    type: LOGOUT_CURRENT_USER

}

export const createUser = user => (dispatch) => (
    SessionsAPIUtil.createUser(user).then((user) => dispatch(receiveCurrentUser(user)))
)

export const createSession = user => (dispatch) => (
    SessionsAPIUtil.createSession(user).then((user) => dispatch(receiveCurrentUser(user)))
)

export const deleteSession = () => (dispatch) => {
    return SessionsAPIUtil.deleteSession().then(() => dispatch(logoutCurrentUser()))
}