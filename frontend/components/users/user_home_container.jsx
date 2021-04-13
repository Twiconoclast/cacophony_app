import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchServers, fetchServer, createServer, deleteServer} from '../../actions/server_actions'
import UserHome from './user_home'
import {createServerMembership, deleteServerMembership} from '../../util/server_membership_api_util'
import {deleteSession} from '../../actions/session_actions'
import {fetchUser, fetchUserByUsername} from '../../actions/user_actions'

const mapSTP = (state) => ({
    user: state.sessions.currentUser,
    friends: state.entities.users,
    statePrivateServers: state.entities.servers.privateServers,
    privateServerFriendIds: state.sessions.currentUser.privateServerFriends
})

const mapDTP = (dispatch) => ({
    deleteSession: () => dispatch(deleteSession()),
    fetchUserByUsername: (username) => dispatch(fetchUserByUsername(username)),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    removeErrors: () => dispatch(removeErrors()),
    fetchServers: (user_id) => dispatch(fetchServers(user_id)),
    fetchServer: (serverId) => dispatch(fetchServer(serverId)),
    createServer: (server) => dispatch(createServer(server)),
    deleteServer: (serverId) => dispatch(deleteServer(serverId)),
    createServerMembership: (server_membership) => dispatch(createServerMembership(server_membership)),
    deleteServerMembership: (member_id, server_id) => dispatch(deleteServerMembership(member_id, server_id)),
})

export default withRouter(connect(mapSTP, mapDTP)(UserHome))