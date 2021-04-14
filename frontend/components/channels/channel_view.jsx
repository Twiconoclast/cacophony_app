import React from 'react'
import PublicServerIndexContainer from '../servers/public_server_index_container'
import PrivateServerIndexContainer from '../servers/private_server_index_container'
import UserSearchFormContainer from '../users/user_search_form'
import UserSearchForm from '../users/user_search_form'

class ChannelView extends React.Component {
    constructor(props) {
        super(props)
        this.deleteServer = this.props.deleteServer.bind(this)
        this.friendClick = this.friendClick.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)
    }

    componentDidMount() {
        this.props.fetchServer(this.props.serverId)
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
                        return <li key={member.id} className='server-member-list-item' title={member.username}>
                            <div className='dm-friend-item-detail'>
                                <div className='user-icon'>{splitSliceUpCase(member.username)}</div>
                                <div>{member.username}</div>
                                <button onClick={() => this.friendClick(member.username, member.id)} className='add-direct-message-button'>+</button>
                            </div>
                        </li>}
                    })
                )}
            })

        return (
            <div>
                <div className="serverbar">
                    <PublicServerIndexContainer></PublicServerIndexContainer>
                </div>
                
                <div className={this.props.user.publicServers.includes(parseInt(this.props.serverId)) ? 'hidden' : ''}><PrivateServerIndexContainer/></div>
                <div className={!this.props.user.publicServers.includes(parseInt(this.props.serverId)) ? 'hidden' : ''}>I hold channels when a public server is selected
                    <UserSearchFormContainer serverId={this.props.serverId}></UserSearchFormContainer> 
                    <button className={!this.props.user.publicServers.includes(parseInt(this.props.serverId)) ? 'hidden' : 'delete-button'} onClick={() => {
                        this.deleteServer(this.props.serverId)
                        this.props.history.push('/channels/@me')
                    }}>Delete Server</button>
                    <div><img src={window.whiteontback} className='home-button-logo' alt="home"/> {this.props.user.username} <button onClick={this.handleLogOut}>Log Out</button></div>
                </div>
                <div>I hold channel messages</div>
                <div><ul>{this.selectedServerIdMembers}</ul></div>
            </div>
        )
    }
}

export default ChannelView