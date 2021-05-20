import {LOGOUT_CURRENT_USER} from '../actions/session_actions'
import {RECEIVE_MESSAGES, RECEIVE_MESSAGE, REMOVE_MESSAGE, RECEIVE_ERRORS, REMOVE_ERRORS} from '../actions/message_actions'

const messagesReducer = (state={}, action) => {
    Object.freeze(state)
    let newState = Object.assign({}, state)
    switch(action.type) {
        case RECEIVE_MESSAGES:
            newState = action.messages
            return newState
        case RECEIVE_MESSAGE:
            newState[Object.keys(action.message)[0]] = Object.values(action.message)[0]
            return newState
        case REMOVE_MESSAGE:
            delete newState[action.messageId.messageId]
            return newState
        case LOGOUT_CURRENT_USER:
            return {}
        default:
            return state
    }
}

export default messagesReducer