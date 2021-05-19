import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {fetchMessages, fetchMessage, createMessage, updateMessage, deleteMessage} from '../../actions/message_actions'

class CreateMessageForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: '',
            author_id: this.props.user.id,
            channel_id: Number(this.props.channelId)
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        // this.props.createMessage(this.state)
        App.cable.subscriptions.subscriptions[0].speak({ message: this.state.body, author_id: this.state.author_id, channel_id: this.state.channel_id });
        this.setState({ body: "" });
    }

    handleChange(type) {
        return (e) => this.setState({[type]: e.currentTarget.value})
    }


    render() {
        if (this.props.channel) {
            return(
                <div id='message-form-holder'>
                    <form onSubmit={this.handleSubmit} className='message-post-form'>
                        <input className='message-form' type="text" value={this.state.body} onChange={this.handleChange('body')} placeholder={`Message #${this.props.channel.channelName}`}/>
                        <button><i id='create-message-plane' className="fas fa-paper-plane"></i></button>
                    </form>
                </div>
            )
        } else {
            return null
        }
    }

}

const mapSTP = (state, ownProps) => ({
    server: state.entities.servers.publicServers[ownProps.match.params.serverId],
    serverId: ownProps.match.params.serverId,
    channelId: ownProps.match.params.channelId,
    user: state.sessions.currentUser,
    messages: Object.values(state.entities.messages),
    channel: state.entities.channels[ownProps.match.params.channelId]

})

const mapDTP = (dispatch) => ({
    removeErrors: () => dispatch(removeErrors()),
    fetchMessages: (channel_id) => dispatch(fetchMessages(channel_id)),
    fetchMessage: (messageId) => dispatch(fetchMessage(messageId)),
    createMessage: (message) => dispatch(createMessage(message)),
    updateMessage: (message) => dispatch(updateMessage(message)),
    deleteMessage: (messageId) => dispatch(deleteMessage(messageId))
})

export default withRouter(connect(mapSTP, mapDTP)(CreateMessageForm))