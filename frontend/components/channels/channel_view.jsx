import React from 'react'
import PublicServerIndexContainer from '../servers/public_server_index_container'

class ChannelView extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchServer(this.props.serverId)
    }

    render() {
        return (
            <div><PublicServerIndexContainer></PublicServerIndexContainer></div>
        )
    }
}

export default ChannelView