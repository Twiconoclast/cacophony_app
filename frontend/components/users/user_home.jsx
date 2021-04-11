import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import PublicServerForm from '../servers/public_server_form'
import SelectedServerDetails from '../servers/selected_server_details'
import PublicServerIndexContainer from '../servers/public_server_index_container'
import PrivateServerIndexContainer from '../servers/private_server_index_container'
// import { fetchServer } from '../../util/servers_api_util';

class UserHome extends React.Component {
    constructor(props) {
        super(props)
        this.handleLogOut = this.handleLogOut.bind(this)
        this.state = {}
       
    }

    componentDidMount() {
        this.props.fetchServers()
        this.setState({publicServers: this.props.user.publicServers, privateServers: this.props.user.privateServers})
    }

    componentDidUpdate() {
    }

    handleLogOut(e) {
        e.preventDefault()
        this.props.deleteSession()
    }

    render() {
        this.serverIdLinks = this.props.user.publicServers.map((serverId) => (
            <li key={serverId} ><Link to={`/channels/${serverId}/${serverId}`}>{serverId}</Link></li>
        ))
        return (           
            <div>
                <header>I'm a header</header>
                <div id="serverbar">
                    <PublicServerIndexContainer servers={this.props.user.publicServers.map((serverId) => this.props.fetchServer(serverId))} serverIdLinks={this.serverIdLinks}/>
                </div>
                <div>I hold private servers when you don't have a server selected, otherwise channels
                    <label>I'm a form to search for a user
                        <input type="text"/>
                    </label>
                    <div>I'm a footer for the channel/private server box</div>
                </div>
                <div>I hold all your fellow server members when no server is selected, messages when one is
                    <div>I hold the message form</div>
                </div>
                <div>I'm not here when no server is selected, after I hold the server's members</div>
                <button onClick={this.handleLogOut}>Log Out</button>
            </div>
        )
    }
}

export default UserHome