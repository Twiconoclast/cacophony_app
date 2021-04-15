import React from 'react'
import { withRouter, Link } from 'react-router-dom';

class ChannelIndex extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
                channel_name: '',
                server_id: this.props.serverId,
                owner_id: this.props.user.id
            }
        this.handleChangeChannel = this.handleChangeChannel.bind(this)
        this.channelCreate = this.channelCreate.bind(this)
        // this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        this.props.fetchChannels(this.props.serverId)
    }

    handleChangeChannel(type) {
        return (e) => this.setState({[type]: e.currentTarget.value})
    }

    channelCreate(e) {
        e.preventDefault()
        this.props.createChannel(this.state)
            .then((response) => {
                this.props.history.push(`/channels/${this.props.serverId}/${Object.values(response.channel)[0].id}`)
                this.setState({channel_name: ''})
            })
    }

    // handleDelete(e) {
    //     e.preventDefault()
    //     this.props.deleteChannel(this.props.channelId)
    //         .then(() => this.props.history.push(`/channels/${this.props.serverId}/${this.props.server.defaultChannelId}`))
    // }
    

    render() {
        if (this.props.server){
            this.channelLinks = this.props.channels.map((channel) => (
                <li className={this.props.channelId == channel.id ? `selected-channel channel` : `channel`} key={channel.id} title={channel.channelName}>
                    <Link className='channel-link' to={`/channels/${this.props.serverId}/${channel.id}`}>
                        <i className="fas fa-hashtag"></i>
                        <div className='channel-name'>{channel.channelName}</div>
                    </Link>
                    <button title='Delete Channel' className={channel.id == this.props.server.defaultChannelId ? 'hidden' : 'delete-channel-button'} onClick={() => {
                        this.props.deleteChannel(channel.id)
                            .then(() => this.props.history.push(`/channels/${this.props.serverId}/${this.props.server.defaultChannelId}`))}}>-</button>
                </li>
            ))
        }
        return (
            <div className='private-server-blank-space'>
                <div className='dmlabel'>CHANNELS</div> 
                <ul id='channel-link-ul'>{this.channelLinks}</ul>
                <form id='new-channel-form' onSubmit={this.channelCreate}>
                    <input id='new-channel-box' type="text" onChange={this.handleChangeChannel('channel_name')} placeholder='new channel' value={this.state.channel_name}/>
                    <button id='channel-add-button'>+</button>
                </form>
            </div>
        )
    }
}

export default ChannelIndex