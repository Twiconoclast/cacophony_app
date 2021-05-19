import React from 'react'
import { Link } from 'react-router-dom';

class PrivateServerIndex extends React.Component {
    constructor(props) {
        super(props)
        this.friendClick = this.friendClick.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)
    }

    componentDidMount() {
        this.props.fetchServers()
    }

    friendClick(name, id) {
        if (this.props.user.privateServerFriends.includes(id)) {
            Object.values(this.props.user.privateServers).forEach((server) => {
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


        this.serverLinks = this.props.privateServers.map((server) => {
            let avatar;
            server.members.forEach((member) => {
                if (member.username != this.props.user.username && member.imageRef) {
                    avatar = (<img src={this.imageTransalator(member.imageRef)}/>)
                } else if (!avatar) {
                    avatar = (<img src={window.whiteontback} className='in-link-logo' alt="home"/>)
                }
            })
            return (<li className={this.props.selectedServerId == server.id ? `selected-private-server private-server` : `private-server`} key={server.id} title={server.serverName}>
                <Link className='private-server-link' to={`/channels/${server.id}/${server.defaultChannelId}`}>
                    {avatar}
                    <div>{server.serverName}</div>
                </Link>
            </li>)
        })
        
        this.selectedServerIdMembers = this.props.privateServers.map((server) => {
            if (this.props.selectedServerId == server.id) {
                return (server.members.map((member) => {
                    if (member.id != this.props.user.id) {
                        let avatarDiv;
                        if (member.imageRef) {
                            avatarDiv = (<div className='user-icon'><img src={this.imageTransalator(member.imageRef)}/></div>)
                        } else {
                            avatarDiv = (<div className='user-icon'>{splitSliceUpCase(member.username)}</div>)
                        }
                        return <li key={member.id} className='server-member-list-item' title={member.username}>
                            <div className='dm-friend-item-detail'>
                                {avatarDiv}
                                <div>{member.username}</div>
                                <button onClick={() => this.friendClick(member.username, member.id)} className='add-direct-message-button'>+</button>
                            </div>
                        </li>}
                    })
                )}
            })

        return (
            <div className='private-server-blank-space'>
                <div id='private-server-friend-label'><i className="fas fa-child"></i> Friends</div>
                <div className='dmlabel'>DIRECT MESSAGES</div>
                <ul id='dmul'>{this.serverLinks}</ul>
                
                {/* <ul>{this.selectedServerIdMembers}</ul> */}
            </div>
        )
    }
}

export default PrivateServerIndex