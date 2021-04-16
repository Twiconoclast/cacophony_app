import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {fetchMessages, fetchMessage, createMessage, updateMessage, deleteMessage} from '../../actions/message_actions'

class EditMessageForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: this.props.message.body,
            author_id: this.props.message.author_id,
            channel_id: this.props.channelId,
            id: this.props.message.id
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.updateMessage(this.state)
        return (e) => this.props.toggle(e)
    }

    handleChange(type) {
        return (e) => this.setState({[type]: e.currentTarget.value})
    }

    componentDidMount() {
        this.props.fetchMessage(this.props.messageId)
    }


    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" title='edit message' value={this.state.body} onChange={this.handleChange('body')}/>
                    <button><i id='edit-button-plane' className="fas fa-paper-plane"></i></button>
                </form>
                <button onClick={(e) => this.props.toggle(e)}>Cancel</button>
                <button onClick={() => this.props.deleteMessage(this.props.messageId)}>Delete Message</button>
            </div>
        )
    }

}

const mapSTP = (state, ownProps) => ({
    toggle: ownProps.toggle,
    message: ownProps.message,
    messageId: ownProps.messageId,
    key: ownProps.messageId,
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

export default withRouter(connect(mapSTP, mapDTP)(EditMessageForm))