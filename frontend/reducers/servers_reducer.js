import {RECEIVE_SERVERS, RECEIVE_SERVER, REMOVE_SERVER} from '../actions/server_actions'

const serversReducer = (state={}, action) => {
    Object.freeze(state)
    let newState = Object.assign({}, state)
    switch(action.type) {
        case RECEIVE_SERVERS:
            newState = Object.assign(newState, action.servers)
            return newState
        case RECEIVE_SERVER:
            newState[action.server.id] = action.server
            return newState
        case REMOVE_SERVER:
            delete newState[action.server.id]
        default:
            return state
    }
}

export default serversReducer