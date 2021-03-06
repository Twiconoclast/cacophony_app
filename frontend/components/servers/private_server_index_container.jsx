import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {deleteSession} from '../../actions/session_actions'
import {fetchServers, fetchServer, createServer, deleteServer} from '../../actions/server_actions'
import {createServerMembership, deleteServerMembership} from '../../actions/server_membership_actions'
import PrivateServerIndex from './private_server_index'

const mapSTP = (state, ownProps) => ({
    user: state.sessions.currentUser,
    serverIdLinks: ownProps.serverIdLinks,
    selectedServerId: ownProps.match.params.serverId,
    privateServers: Object.values(state.entities.servers.privateServers)
})

const mapDTP = (dispatch) => ({
    deleteSession: () => dispatch(deleteSession()),
    fetchUserByUsername: (username) => dispatch(fetchUserByUsername(username)),
    fetchUser: (id) => dispatch(fetchUser(id)),
    removeErrors: () => dispatch(removeErrors()),
    fetchServers: (user_id) => dispatch(fetchServers(user_id)),
    fetchServer: (serverId) => dispatch(fetchServer(serverId)),
    createServer: (server) => dispatch(createServer(server)),
    deleteServer: (serverId) => dispatch(deleteServer(serverId)),
    createServerMembership: (server_membership) => dispatch(createServerMembership(server_membership)),
    deleteServerMembership: (member_id, server_id) => dispatch(deleteServerMembership(member_id, server_id)),
})

export default withRouter(connect(mapSTP, mapDTP)(PrivateServerIndex))