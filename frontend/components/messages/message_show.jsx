import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {deleteSession} from '../../actions/session_actions'
import {fetchUserByUsername, fetchUser, removeErrors} from '../../actions/user_actions'
import {fetchServers, fetchServer, createServer, deleteServer} from '../../actions/server_actions'
import {createServerMembership, deleteServerMembership} from '../../actions/server_membership_actions'
import MessagesIndex from './messages_index'
import {fetchChannels, fetchChannel, createChannel, deleteChannel} from '../../actions/channel_actions'
import {fetchMessages, fetchMessage, createMessage, updateMessage, deleteMessage} from '../../actions/message_actions'
import EditMessageFormContainer from './edit_message_form'

class MessageShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hidden: true
        }

        this.toggle = this.toggle.bind(this)
    }

    handleChange(type) {
        return (e) => this.setState({[type]: e.currentTarget.value})
    }

    toggle(e) {
        this.setState({hidden: !this.state.hidden})
    }

    render() {
        if (this.props.message.channelId == this.props.channelId) {
            return (<li key={this.props.message.id}>
                <div>{this.props.message.createdAt}</div>
                <div>{this.props.message.author}</div>
                <div className={this.state.hidden ? 'message-body' : 'hidden'}>{this.props.message.body}</div>
                <button onClick={this.toggle} className={this.props.user.id != this.props.message.authorId ? 'hidden' : ''}>
                    <i className="fas fa-pen"></i>
                </button>
                <div className={this.state.hidden ? 'hidden' : ''}>
                <EditMessageFormContainer toggle={this.toggle} message={this.props.message} messageId={this.props.message.id}
                />
                </div>
            </li>)
        } else {
            return null
        }
    }
}

export default MessageShow