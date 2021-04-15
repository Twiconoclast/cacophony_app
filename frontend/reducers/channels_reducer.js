import {LOGOUT_CURRENT_USER} from '../actions/session_actions'
import {RECEIVE_CHANNELS, RECEIVE_CHANNEL, REMOVE_CHANNEL, RECEIVE_ERRORS, REMOVE_ERRORS} from '../actions/channel_actions'

const channelsReducer = (state={}, action) => {
    Object.freeze(state)
    let newState = Object.assign({}, state)
    switch(action.type) {
        case RECEIVE_CHANNELS:
            newState = action.channels
            return newState
        case RECEIVE_CHANNEL:
            newState[Object.keys(action.channel)[0]] = Object.values(action.channel)[0]
            return newState
        case REMOVE_CHANNEL:
            delete newState[action.channelId.channelId]
            return newState
        case LOGOUT_CURRENT_USER:
            return {}
        default:
            return state
    }
}

export default channelsReducer