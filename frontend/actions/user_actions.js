import * as UsersAPIUtil from '../util/users_api_util'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const RECEIVE_USER = 'RECEIVE_USER'
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS'
export const REMOVE_ERRORS = 'REMOVE_ERRORS'

const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

const receiveErrors = (errors) => ({
    type: RECEIVE_ERRORS,
    errors
})

export const removeErrors = () => ({
    type: REMOVE_ERRORS
})

export const fetchUserByUsername = (username) => (dispatch) => (
    UsersAPIUtil.fetchUserByUsername(username).then((users) => dispatch(receiveUsers(users))).catch(errors => dispatch(receiveErrors(errors)))
)

export const fetchUser = (userId) => (dispatch) => (
    UsersAPIUtil.fetchUser(userId).then((user) => dispatch(receiveUser(user))).catch(errors => dispatch(receiveErrors(errors)))
)