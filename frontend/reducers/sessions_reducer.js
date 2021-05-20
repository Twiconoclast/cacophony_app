import {RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER} from '../actions/session_actions'
import {REMOVE_SERVER, RECEIVE_SERVER} from '../actions/server_actions'

const _nullSession = {
    currentUser: null
}

const sessionsReducer = (state=_nullSession, action) => {
    
    Object.freeze(state)
    let newState = Object.assign({}, state)
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, {currentUser: action.user})
        case LOGOUT_CURRENT_USER:
            return _nullSession
        case REMOVE_SERVER:
    
            if (action.serverId.public_servers != null) {
                newState.currentUser.publicServers = newState.currentUser.publicServers.filter((ele) => ele == action.serverId.public_servers.id)
            } else if (action.serverId.private_servers != null) {
                newState.currentUser.privateServers = newState.currentUser.privateServers.filter((ele) => ele == action.serverId.private_servers.id)
            }
            return newState
        case RECEIVE_SERVER:
            
            if (action.server.publicServers != null && !newState.currentUser.publicServers.includes(parseInt(Object.keys(action.server.publicServers)[0]))) {
                newState.currentUser.publicServers.push(parseInt(Object.keys(action.server.publicServers)[0]))
            } else if (action.server.privateServers != null && !newState.currentUser.privateServers.includes(parseInt(Object.keys(action.server.privateServers)[0]))) {
                newState.currentUser.privateServers.push((parseInt(Object.keys(action.server.privateServers)[0])))
            }
            return newState
        default:
            return state
    }
}

export default sessionsReducer