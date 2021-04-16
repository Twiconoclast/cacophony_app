import React from "react";
import EditMessageFormContainer from './edit_message_form'
import CreateMessageFormContainer from './create_message_form'
import MessageShow from './message_show'

class MessagesIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hidden: true
        }

        // this.toggle = this.toggle.bind(this)
    }

    handleNewMessageForm(e) {
        e.preventDefault()
        this.props.createMessage(this.state)
            .then(this.setState({body: ''}))
    }

    handleChange(type) {
        return (e) => this.setState({[type]: e.currentTarget.value})
    }

    toggle(e) {
        this.setState({hidden: !this.state.hidden})
    }

    render() {
        let messageItems;
        if (this.props.messages){
            messageItems = this.props.messages.map((message) => {
                return <MessageShow user={this.props.user} key={message.id} channelId={this.props.channelId} message={message}/>
            })
        }

        return(
            <div>
                <ul>{messageItems}</ul>
                <CreateMessageFormContainer/>
            </div>
        )
    }
}

export default MessagesIndex