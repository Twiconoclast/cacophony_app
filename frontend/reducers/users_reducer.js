import {RECEIVE_USERS, RECEIVE_USER} from '../actions/user_actions'
import {LOGOUT_CURRENT_USER} from '../actions/session_actions'

const usersReducer = (state={}, action) => {
    Object.freeze(state)
    let newState = Object.assign({}, state)
    switch(action.type) {
        case RECEIVE_USERS:
            newState = action.users
            return newState
        case RECEIVE_USER:
            newState[action.user.id] = action.user
            return newState
        case LOGOUT_CURRENT_USER:
            return {}
        default:
            return state
    }
}

export default usersReducer