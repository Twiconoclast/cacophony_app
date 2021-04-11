import React from 'react'
import { Link } from 'react-router-dom';
import PublicServerForm from './public_server_form'

class PublicServerIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {hidden: true}
    }

    componentDidMount() {
        this.props.fetchServers()
    }

    toggle(e) {
        this.setState({hidden: !this.state.hidden})
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
            <li key={server.id} title={server.serverName}><Link to={`/channels/${server.id}/${server.id}`}>{splitSliceUpCase(server.serverName)}</Link></li>
        ))


        return (
            <div>
                <ul>{this.serverLinks}</ul>
                <button onClick={(e) => this.toggle(e)}>I open up the form to create a new server</button>
                <div className={this.state.hidden ? 'hidden' : ''}>
                    <PublicServerForm ownerId={this.props.user.id} createServer={this.props.createServer}/>
                </div>
            </div>
        )
    }
}

export default PublicServerIndex