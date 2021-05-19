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

    imageTransalator(ref) {
        if (ref === 'blueballoonav') {
            return window.blueballoonav
        } else if (ref === 'blueguyav') {
            return window.blueguyav
        } else if (ref === 'frogav') {
            return window.frogav
        } else if (ref === 'mayberabbitav') {
            return window.mayberabbitav
        } else if (ref === 'mushroomav') {
            return window.mushroomav
        } else if (ref === 'wizardav') {
            return window.wizardav
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
        let avatar;
            if (this.props.message.authorImage) {
                avatar = (<img src={this.imageTransalator(this.props.message.authorImage)}/>)
            } else {
                avatar = (<div className='user-icon'>{splitSliceUpCase(this.props.message.author)}</div>)
            }
        if (this.props.message.channelId == this.props.channelId) {
            return (
            <div>
                {avatar}
                <li key={this.props.message.id}>
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
                </li>
            </div>
            )
        } else {
            return null
        }
    }
}

export default MessageShow