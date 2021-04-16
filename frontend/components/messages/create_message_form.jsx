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
            channel_id: this.props.channelId
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.createMessage(this.state)
            .then(() => this.setState({body: ''}))
    }

    handleChange(type) {
        return (e) => this.setState({[type]: e.currentTarget.value})
    }


    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.body} onChange={this.handleChange('body')}/>
                    <button><i className="fas fa-paper-plane"></i></button>
                </form>
            </div>
        )
    }

}

const mapSTP = (state, ownProps) => ({
    server: state.entities.servers.publicServers[ownProps.match.params.serverId],
    serverId: ownProps.match.params.serverId,
    channelId: ownProps.match.params.channelId,
    user: state.sessions.currentUser,
    messages: Object.values(state.entities.messages),

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