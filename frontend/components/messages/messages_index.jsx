import React from "react";
import EditMessageFormContainer from './edit_message_form'
import CreateMessageFormContainer from './create_message_form'
import MessageShow from './message_show'

class MessagesIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = { messages: this.props.messages };
        this.bottom = React.createRef();
        this.subscription
        console.log(this.bottom)
        // this.toggle = this.toggle.bind(this)
    }

    UNSAFE_componentWillReceiveProps(prevProps) {
        if (this.props.messages.length >= prevProps.messages.length) {
            this.setState({messages: this.props.messages})
        }
    }

    componentWillUnmount() {
        App.cable.subscriptions.remove(this.subscription)
    }

    componentDidMount() {

        this.subscription = App.cable.subscriptions.create(
            
          { channel: "ChatChannel" },
          {
            received: data => {
                switch (data.type) {
                    case "message":
                        this.setState({
                            messages: this.state.messages.concat([data.message])
                        });
                        console.log(this.state)
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
        let messageItems;
        if (this.state.messages && this.props.selectedChannel){
            messageItems = this.state.messages.map((message) => {
                let avatar;
                if (message.authorImage) {
                    avatar = (<img src={this.imageTransalator(message.authorImage)}/>)
                } else {
                    avatar = (<div className='user-icon'>{splitSliceUpCase(message.author)}</div>)
                }
                if (message.channelId === this.props.selectedChannel.id) {
                return   (<div key={message.id} className='message-holder'>
                            
                            <MessageShow user={this.props.user} key={message.id} channelName={this.props.selectedChannel.channelName} channelId={this.props.channelId} message={message}/>
                            <div ref={this.bottom} />
                        </div>)
                } else {
                    return (<div key={message.id} className='hidden'></div>)
                }
            }) 
        }
        // messageItems = this.state.messages.map(message => {
        //     return (
        //         <li key={message.id}>
        //             {message}
        //             <div ref={this.bottom} />
        //         </li>
        //     );
        // });


        return(
            <div id='message-div'>
                {/* <button className="load-button" onClick={this.loadChat.bind(this)}>Load Chat History</button> */}
                <ul id='list'>{messageItems}</ul>
                {/* <CreateMessageFormContainer/> */}
            </div>
        )
    }
}

export default MessagesIndex