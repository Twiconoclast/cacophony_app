import {RECEIVE_SERVERS, RECEIVE_SERVER, REMOVE_SERVER} from '../actions/server_actions'
import {LOGOUT_CURRENT_USER} from '../actions/session_actions'

const preState = {
    publicServers: {},
    privateServers: {}
}

const serversReducer = (state=preState, action) => {
    Object.freeze(state)
    let newState = Object.assign({}, state)
    switch(action.type) {
        case RECEIVE_SERVERS:
            if (action.servers.publicServers != null) {
                newState.publicServers = action.servers.publicServers
            }
            if (action.servers.privateServers != null) {
                newState.privateServers = action.servers.privateServers
            }
            return newState
        case RECEIVE_SERVER:
            if (action.server.publicServers != null) {
                newState.publicServers[Object.keys(action.server.publicServers)[0]] = Object.values(action.server.publicServers)[0]
            } else if (action.server.privateServers != null) {
                newState.privateServers[Object.keys(action.server.privateServers)[0]] = Object.values(action.server.privateServers)[0]
            }
            return newState
        case REMOVE_SERVER:
            console.log(action.serverId.public_servers)
            if (action.serverId.public_servers != null) {
                delete newState.publicServers[parseInt(action.serverId.public_servers.id)]
            } else if (action.serverId.private_servers != null) {
                delete newState.privateServers[parseInt(action.serverId.private_servers.id)]
            }
            return newState
        case LOGOUT_CURRENT_USER:
            return preState
        default:
            return state
    }
}

export default serversReducer