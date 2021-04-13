import React from 'react'
import { Link } from 'react-router-dom';
import PublicServerForm from './public_server_form'

class PublicServerIndex extends React.Component {
    constructor(props) {
        super(props)

        this.state = {hidden: true}
        this.toggle = this.toggle.bind(this)
        this.friendClick = this.friendClick.bind(this)

    }

    componentDidMount() {
        this.props.fetchServers()
    }

    toggle(e) {
        this.setState({hidden: !this.state.hidden})
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

    render() {
        const splitSliceUpCase = (str) => {
            let newStr = str.slice(0, 1).toUpperCase() + str.slice(1)
            let newestStr = newStr.split(' ').map((word) => (
                word.slice(0, 1)
            ))
            return newestStr
        }

        this.serverLinks = this.props.publicServers.map((server) => (
            <li className={this.props.selectedServerId == server.id ? `selected-public-server public-server` : `public-server`} key={server.id} title={server.serverName}><Link to={`/channels/${server.id}/${server.defaultChannelId}`}><div>{splitSliceUpCase(server.serverName)}</div></Link></li>
        ))
                

        return (
            <div>
                <div id='home-button'><Link to={`/channels/@me`}><img src={window.whiteontback} className='home-button-logo' alt="home"/></Link></div>
                <ul>{this.serverLinks}</ul>
                <button onClick={(e) => this.toggle(e)}>I open up the form to create a new server</button>
                <div className={this.state.hidden ? 'hidden' : ''}>
                    <PublicServerForm ownerId={this.props.user.id} createServer={this.props.createServer} closeForm={this.toggle}/>
                </div>
                {/* <ul>{this.selectedServerIdMembers}</ul> */}
            </div>
        )
    }
}

export default PublicServerIndex