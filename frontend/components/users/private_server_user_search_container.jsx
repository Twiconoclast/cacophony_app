import React from 'react'
import { withRouter } from 'react-router-dom';
import * as UserAPIUtil from '../../util/users_api_util'
import {fetchServers, fetchServer, createServer, deleteServer} from '../../actions/server_actions'
import { connect } from 'react-redux';

class PrivateServerUserSearchForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            autoCompleteResults: [],
            userSelected: {},
            showUserSelected: false
        }
        this.friendClick = this.friendClick.bind(this)
    }

    friendClick(name, id) {
        if (this.props.user.privateServerFriends.includes(id)) {
            Object.values(this.props.statePrivateServers).forEach((server) => {
                if (server.ownerId === id || server.recipientId === id) {
                    this.props.history.push(`/channels/${server.id}/${server.defaultChannelId}`)
                }
            })
        } else {
            return this.props.createServer({owner_id: this.props.user.id, server_name: `DM-${name}-${this.props.user.username}`, private: true, recipient_id: id})
            .then((response) => this.props.history.push(`/channels/${Object.values(response.server.privateServers)[0].id}/${Object.values(response.server.privateServers)[0].defaultChannelId}`))
        }
    }

    getAutoCompleteResults(e) {
        this.setState({username: e.currentTarget.value}, 
        () => {UserAPIUtil.fetchUserByUsername(this.state.username)
            .then((result) => {
                const searchResult = result.users.filter((user) => (user.id != this.props.user.id))
                return this.setState({autoCompleteResults: searchResult})})
        })
    }

    handleBlur() {
        () => this.setState({username: '',
        autoCompleteResults: []})
        }


    render() {

        let autocompleteList = this.state.autoCompleteResults.map((result, idx) => (
            
            <li className='result-li' key={idx} onClick={(e) => this.friendClick(result.username, result.id)}>{result.username}</li>
        ))

        return (
            <div id='private-search-bar'>
                <input className='search-for-friends' ref={ (input) => { this.searchBar = input } } value={ this.state.username } onChange={ this.getAutoCompleteResults.bind(this) } type='text' placeholder='Find or start a conversation' />
                <ul id='results'>{autocompleteList}</ul>
            </div>
        )
    }
}

const mapSTP = (state) => ({
    user: state.sessions.currentUser,
    privateServers: Object.values(state.entities.servers.privateServers),
    user: state.sessions.currentUser,
    friends: state.entities.users,
    statePrivateServers: state.entities.servers.privateServers,
    privateServerFriendIds: state.sessions.currentUser.privateServerFriends
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

export default withRouter(connect(mapSTP, mapDTP)(PrivateServerUserSearchForm))