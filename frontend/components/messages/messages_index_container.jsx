import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {deleteSession} from '../../actions/session_actions'
import {fetchUserByUsername, fetchUser, removeErrors} from '../../actions/user_actions'
import {fetchServers, fetchServer, createServer, deleteServer} from '../../actions/server_actions'
import {createServerMembership, deleteServerMembership} from '../../actions/server_membership_actions'
import MessagesIndex from './messages_index'
import {fetchChannels, fetchChannel, createChannel, deleteChannel} from '../../actions/channel_actions'
import {fetchMessages, fetchMessage, createMessage, updateMessage, deleteMessage} from '../../actions/message_actions'

const mapSTP = (state, ownProps) => ({
    key: ownProps.match.params.channelId,
    server: state.entities.servers.publicServers[ownProps.match.params.serverId],
    selectedChannel: state.entities.channels[ownProps.match.params.channelId],
    publicServers: Object.values(state.entities.servers.publicServers),
    privateServers: Object.values(state.entities.servers.privateServers),
    serverId: ownProps.match.params.serverId,
    channelId: ownProps.match.params.channelId,
    user: state.sessions.currentUser,
    ownedServers: state.sessions.currentUser.ownedServers,
    messages: Object.values(state.entities.messages)
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
    deleteServerMembership: (member_id, server_id) => dispatch(deleteServerMembership(member_id, server_id)),
    fetchChannels: (server_id) => dispatch(fetchChannels(server_id)),
    fetchChannel: (channelId, server_id) => dispatch(fetchChannel(channelId, server_id)),
    createChannel: (channel) => dispatch(createChannel(channel)),
    deleteChannel: (channelId) => dispatch(deleteChannel(channelId)),
    fetchMessages: (channel_id) => dispatch(fetchMessages(channel_id)),
    fetchMessage: (messageId) => dispatch(fetchMessage(messageId)),
    createMessage: (message) => dispatch(createMessage(message)),
    updateMessage: (message) => dispatch(updateMessage(message)),
    deleteMessage: (messageId) => dispatch(deleteMessage(messageId))
})

export default withRouter(connect(mapSTP, mapDTP)(MessagesIndex))