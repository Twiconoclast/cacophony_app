import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import PublicServerForm from '../servers/public_server_form'
import SelectedServerDetails from '../servers/selected_server_details'
import PublicServerIndexContainer from '../servers/public_server_index_container'
import PrivateServerIndexContainer from '../servers/private_server_index_container'
import PrivateServerUserSearchContainer from './private_server_user_search_container'
// import { fetchServer } from '../../util/servers_api_util';

class UserHome extends React.Component {
    constructor(props) {
        super(props)
        this.props.fetchServers()
        this.props.user.fellowServerMembers.forEach((friendId) =>{
            this.props.fetchUser(friendId)
        })
        this.arrayOfStatePrivateServers = Object.values(this.props.statePrivateServers)
        this.state = {}
        this.fSMList = []
        this.handleLogOut = this.handleLogOut.bind(this)
    }

    componentDidMount() {
        this.setState({publicServers: this.props.user.publicServers, privateServers: this.props.user.privateServers, fellowServerMembers: this.props.user.fellowServerMembers})
    }

    componentDidUpdate() {
    }

    handleLogOut(e) {
        e.preventDefault()
        this.props.deleteSession()
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

    render() {
        this.fSMList = Object.values(this.props.friends)

        const splitSliceUpCase = (str) => {
            let newStr = str.slice(0, 1).toUpperCase() + str.slice(1)
            let newestStr = newStr.split(' ').map((word) => (
                word.slice(0, 1)
            ))
            return newestStr
        }

        this.fLItems = this.fSMList.map((friend) => {
            if (this.props.user.fellowServerMembers.includes(friend.id)) {
                return (<li className='friend-item' key={friend.id}>
                    <div className='friend-item-detail' onClick={() => this.friendClick(friend.username, friend.id)}>
                        <div id='name-and-letters'>
                            <div className='user-icon'>{splitSliceUpCase(friend.username)}</div>
                            <div className='friend-name'>{friend.username}</div>
                        </div>
                        <div id='friend-list-buttons'>
                            <button className='message-button' onClick={() => this.friendClick(friend.username, friend.id)}><i className="fas fa-comment-alt"></i></button>
                            <button className='options-button'><i className="fas fa-ellipsis-v"></i></button>
                        </div>
                    </div>
                </li>)
            }
        })

        this.privateServerFriends = this.fSMList.map((friend) => {
            if (this.props.privateServerFriendIds.includes(friend.id)) {
                return (<li className='dm-friend-item' key={friend.id}>
                    <div className='dm-friend-item-detail' onClick={() => this.friendClick(friend.name, friend.id)}>
                        <div className='user-icon'>{splitSliceUpCase(friend.username)}</div>
                        <div>{friend.username}</div>
                        <button className='options-button'><i className="fas fa-ellipsis-v"></i></button>
                    </div>
                </li>)
            }
        })

        this.serverIdLinks = this.props.user.publicServers.map((serverId) => (
            <li key={serverId} className='public-server-links'><Link to={`/channels/${serverId}/${serverId}`}></Link></li>
        ))

        this.privateServerIdLinks = this.props.user.privateServers.map((serverId) => (
            <li key={serverId} className='private-server-links'><Link to={`/channels/${serverId}/${serverId}`}></Link></li>
        ))

        return (           
            <div id='homepage'>
                <div className="serverbar">
                    <PublicServerIndexContainer serverIdLinks={this.serverIdLinks}/>
                </div>
                <div className='private-server-div'>
                    <header id="private-server-search"><PrivateServerUserSearchContainer/></header>
                    <div id='private-server-holder'>
                        <PrivateServerIndexContainer serverIdLinks={this.privateServerIdLinks}/>
                        <footer id='private-server-div-footer'>
                            <div id='inner-footer-div'>
                                <img src={window.whiteontback} className='in-footer-logo' alt="home"/> <div id='footer-name'>{this.props.user.username}</div>
                                <button id='logout-button' onClick={this.handleLogOut}>Log Out</button>
                            </div>
                        </footer>
                    </div>
                </div>
                <div className='header-and-main'>
                    <header id='main-header'></header>
                    <div id='middle-main'>
                        <div className='middle-home'>
                            <div className='home-friends-div'>
                                <div id='all-friends-label'>ALL FRIENDS - {this.fSMList.length}</div>
                                <ul id='homepage-friend-list-items'>{this.fLItems}</ul>
                            </div>
                        </div>
                        <div className='right-most-div'>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserHome