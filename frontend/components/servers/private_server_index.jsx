import React from 'react'
import { Link } from 'react-router-dom';

class PrivateServerIndex extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchServers()
    }

    render() {
        // console.log(Object.values(this.state))
        const splitSliceUpCase = (str) => {
            let newStr = str.slice(0, 1).toUpperCase() + str.slice(1)
            let newestStr = newStr.split(' ').map((word) => (
                word.slice(0, 1)
            ))
            return newestStr
        }

        this.serverLinks = this.props.privateServers.map((server) => (
            <li key={server.id} ><Link to={`/channels/${server.id}/${server.id}`}>{splitSliceUpCase(server.serverName)}</Link></li>
        ))
        return (
            <div>
                <ul>{this.serverLinks}</ul>
            </div>
        )
    }
}

export default PrivateServerIndex