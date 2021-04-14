import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {deleteSession} from '../../actions/session_actions'
import {fetchUserByUsername, fetchUser, removeErrors} from '../../actions/user_actions'
import {fetchServers, fetchServer, createServer, deleteServer} from '../../actions/server_actions'
import {createServerMembership, deleteServerMembership} from '../../actions/server_membership_actions'
import ChannelView from './channel_view'

const mapSTP = (state, ownProps) => ({
    server: state.entities.servers[ownProps.match.params.serverId],
    publicServers: Object.values(state.entities.servers.publicServers),
    privateServers: Object.values(state.entities.servers.privateServers),
    serverId: ownProps.match.params.serverId,
    user: state.sessions.currentUser
    // members: state.entities.servers[ownProps.match.params.serverId].members
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
    deleteServerMembership: (member_id, server_id) => dispatch(deleteServerMembership(member_id, server_id))
})

export default withRouter(connect(mapSTP, mapDTP)(ChannelView))