import * as ServerAPIUtils from '../util/servers_api_util'
export const RECEIVE_SERVERS = 'RECEIVE_SERVERS'
export const RECEIVE_SERVER = 'RECEIVE_SERVER'
export const REMOVE_SERVER = 'REMOVE_SERVER'
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS'
export const REMOVE_ERRORS = 'REMOVE_ERRORS'

const receiveServers = (servers) => ({
    type: RECEIVE_SERVERS,
    servers
})

const receiveServer = (server) => ({
    type: RECEIVE_SERVER,
    server
})

const removeServer = (serverId) => ({
    type: REMOVE_SERVER,
    serverId
})

const receiveErrors = (errors) => ({
    type: RECEIVE_ERRORS,
    errors
})

export const removeErrors = () => ({
    type: REMOVE_ERRORS
})

export const fetchServers = (user_id) => (dispatch) => (
    ServerAPIUtils.fetchServers(user_id).then((servers) => dispatch(receiveServers(servers)))
)

export const fetchServer = (serverId) => (dispatch) => (
    ServerAPIUtils.fetchServer(serverId).then((server) => dispatch(receiveServer(server))).catch(errors => dispatch(receiveErrors(errors)))
)

export const createServer = (serverId) => (dispatch) => (
    ServerAPIUtils.createServer(serverId).then((server) => dispatch(receiveServer(server))).catch(errors => dispatch(receiveErrors(errors)))
)

export const deleteServer = (serverId) => (dispatch) => (
    ServerAPIUtils.deleteServer(serverId).then((serverId) => dispatch(removeServer(serverId))).catch(errors => dispatch(receiveErrors(errors)))
)