import React from "react";
import EditMessageFormContainer from './edit_message_form'
import CreateMessageFormContainer from './create_message_form'
import MessageShow from './message_show'

class MessagesIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = { messages: [] };
        // this.toggle = this.toggle.bind(this)
    }

    componentDidMount() {
        App.cable.subscriptions.create(
          { channel: "ChatChannel" },
          {
            received: data => {
              switch (data.type) {
                case "message":
                  this.setState({
                    messages: this.state.messages.concat(data.message)
                  });
                  break;
                case "messages":
                  this.setState({ messages: data.messages });
                  break;
              }
            },
            speak: function (data) { return this.perform("speak", data) },
            load: function (data) { return this.perform("load", data) }
          }
        );
      }
      
      loadChat(e) {
        e.preventDefault();
        App.cable.subscriptions.subscriptions[0].load(this.props.channelId);
      }
       componentDidUpdate() {
        // this.bottom.current.scrollIntoView();
      }
     

    render() {
        let messageItems;
        if (this.props.messages && this.props.selectedChannel){
            messageItems = this.props.messages.map((message) => {
                return   (<div key={message.id} class='message-holder'>
                            <MessageShow user={this.props.user} key={message.id} channelName={this.props.selectedChannel.channelName} channelId={this.props.channelId} message={message}/>
                            <div ref={this.bottom} />
                        </div>)
            }) 
        }

        return(
            <div>
                <button className="load-button" onClick={this.loadChat.bind(this)}>Load Chat History</button>
                <ul>{messageItems}</ul>
                <CreateMessageFormContainer/>
            </div>
        )
    }
}

export default MessagesIndex