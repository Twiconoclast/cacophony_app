import React from 'react'
import PublicServerIndexContainer from '../servers/public_server_index_container'
import PrivateServerIndexContainer from '../servers/private_server_index_container'
import UserSearchFormContainer from '../users/user_search_form'
import UserSearchForm from '../users/user_search_form'
import PrivateServerUserSearchContainer from '../users/private_server_user_search_container'
import ChannelIndexContainer from './channel_index_container'
import MessagesIndexContainer from '../messages/messages_index_container'
import CreateMessageFormContainer from '../messages/create_message_form'

class ChannelView extends React.Component {
    constructor(props) {
        super(props)
        this.deleteServer = this.props.deleteServer.bind(this)
        this.friendClick = this.friendClick.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)
        
        // this.state = {
        //     channelId: this.props.channelId
        // }
    }


    componentDidMount() {
        this.props.fetchServer(this.props.serverId)
        this.props.fetchChannels(this.props.serverId)
        this.props.fetchChannel(this.props.channelId)
        this.props.fetchMessages(this.props.channelId)
    }

    UNSAFE_componentWillReceiveProps(prevProps) {

    }

    friendClick(name, id) {
        if (this.props.user.privateServerFriends.includes(id)) {
            Object.values(this.props.privateServers).forEach((server) => {
                if (server.ownerId == id || server.recipientId == id) {
                    this.props.history.push(`/channels/${server.id}/${server.defaultChannelId}`)
                }
            })
        } else {
            return this.props.createServer({owner_id: this.props.user.id, server_name: `DM-${name}-${this.props.user.username}`, private: true, recipient_id: id})
            .then((response) => this.props.history.push(`/channels/${Object.values(response.server.privateServers)[0].id}/${Object.values(response.server.privateServers)[0].defaultChannelId}`))
        }
    }

    handleLogOut(e) {
        e.preventDefault()
        this.props.deleteSession()
    }

    imageTransalator(ref) {
        if (ref === 'blueballoonav') {
            return window.blueballoonav
        } else if (ref === 'blueguyav') {
            return window.blueguyav
        } else if (ref === 'frogav') {
            return window.frogav
        } else if (ref === 'mayberabbitav') {
            return window.mayberabbitav
        } else if (ref === 'mushroomav') {
            return window.mushroomav
        } else if (ref === 'wizardav') {
            return window.wizardav
        }
    }

    render() {
        const splitSliceUpCase = (str) => {
            let newStr = str.slice(0, 1).toUpperCase() + str.slice(1)
            let newestStr = newStr.split(' ').map((word) => (
                word.slice(0, 1)
            ))
            return newestStr
        }
        
        this.selectedServerIdMembers = this.props.publicServers.concat(this.props.privateServers).map((server) => {
            if (this.props.serverId == server.id) {
                return (server.members.map((member) => {
                    if (member.id != this.props.user.id) {
                        let avatarDiv;
                        if (member.imageRef) {
                            avatarDiv = (<div className='user-icon'>
                                <img src={this.imageTransalator(member.imageRef)}/>
                                <div className='dm-username'>{member.username}</div>
                            </div>)
                            
                        } else {
                            avatarDiv = (<div className='user-icon'>
                                <div>{splitSliceUpCase(member.username)}</div>
                                <div className='dm-username'>{member.username}</div>
                            </div>)
                        }
                        return <li key={member.id} className='server-member-list-item' title={member.username}>
                            <div className='dm-friend-item-detail'>
                                {avatarDiv}
                                
                                <button onClick={() => this.friendClick(member.username, member.id)} className='add-direct-message-button'>+</button>
                            </div>
                        </li>}
                    })
                )}
            })

        let headerContent;
        if (this.props.selectedChannel){
            if (this.props.user.publicServers.includes(parseInt(this.props.serverId))) {
                headerContent = <div className='server-view-header'>
                                    <div className='search-and-channel-holder'>
                                        <div className='channel-name-top'><i className="fas fa-hashtag"></i>{this.props.selectedChannel.channelName}</div>
                                        <UserSearchFormContainer serverId={this.props.serverId}></UserSearchFormContainer> 
                                    </div>
                                </div>
            } else if (!this.props.user.publicServers.includes(parseInt(this.props.serverId))) {
                headerContent = <div className='server-view-header'>
                                    <div className='channel-name-top'><i className="fas fa-hashtag"></i>
                                    {this.props.selectedChannel.channelName}</div>
                                </div>
                }
            }

        let serverName;
        if (this.props.server) {
            serverName = this.props.server.serverName.slice(0, 1).toUpperCase() + this.props.server.serverName.slice(1)
        }

        return (
            <div className='homepage'>
                <div className="serverbar">
                    <PublicServerIndexContainer></PublicServerIndexContainer>
                </div>
                
                <div className={this.props.user.publicServers.includes(parseInt(this.props.serverId)) ? 'hidden' : 'private-server-div'}>
                    <header className="private-server-search"><PrivateServerUserSearchContainer/></header>
                    <div className='private-server-holder'>
                        <PrivateServerIndexContainer/>
                        <footer className='private-server-div-footer'>
                            <div className='inner-footer-div'>
                                <img src={window.whiteontback} className='in-footer-logo' alt="home"/> <div className='footer-name'>{this.props.user.username}</div>
                                <button className='logout-button' onClick={this.handleLogOut}>Log Out</button>
                            </div>
                        </footer>
                    </div>
                </div>
                <div className={!this.props.user.publicServers.includes(parseInt(this.props.serverId)) ? 'hidden' : 'private-server-div'}>
                    <header className="selected-public-server-name-header">
                        <div>{serverName}</div></header>
                    <div id='server-channel-holder'>
                        <ChannelIndexContainer/>
                        <button className={!this.props.ownedServers.includes(parseInt(this.props.serverId)) ? 'hidden' : 'delete-button'} 
                            onClick={() => {
                                this.deleteServer(this.props.serverId)
                                this.props.history.push('/channels/@me')
                                }}>Delete Server</button>
                        <footer className='private-server-div-footer'>
                            <div className='inner-footer-div'>
                                <img src={window.whiteontback} className='in-footer-logo' alt="home"/> 
                                <div className='footer-name'>{this.props.user.username}</div>
                                <button className='logout-button' onClick={this.handleLogOut}>Log Out</button>
                            </div>
                        </footer>
                    </div>
                </div>
                <div className='header-and-main'>
                    <header className='main-header'>{headerContent}</header>
                    
                    <div className='middle-main'>
                        <div className='middle-home'>
                            <div id='micontainer-holder'>
                                <MessagesIndexContainer/>
                                <CreateMessageFormContainer/>
                            </div>
                        </div>
                    <div className='right-most-div'><ul id='server-member-div'>{this.selectedServerIdMembers}</ul></div>
                    </div>   
                
                </div>
            </div>
        )
    }
}

export default ChannelView