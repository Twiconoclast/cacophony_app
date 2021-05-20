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
        // this.toggle = this.toggle.bind(this)
        this.messageDeleted = this.messageDeleted.bind(this)
    }

    messageDeleted(){
        this.setState({messages: this.props.messages})
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

    dateFormatter(date) {
        let month;
        if (date.slice(5, 7) === '01') {
            month = 'January'
        } else if (date.slice(5, 7) === '02') {
            month = 'February'
        }  else if (date.slice(5, 7) === '02') {
            month = 'February'
        }  else if (date.slice(5, 7) === '03') {
            month = 'March'
        }  else if (date.slice(5, 7) === '04') {
            month = 'April'
        }  else if (date.slice(5, 7) === '05') {
            month = 'May'
        }  else if (date.slice(5, 7) === '06') {
            month = 'June'
        }  else if (date.slice(5, 7) === '07') {
            month = 'July'
        }  else if (date.slice(5, 7) === '08') {
            month = 'August'
        }  else if (date.slice(5, 7) === '09') {
            month = 'September'
        }  else if (date.slice(5, 7) === '10') {
            month = 'October'
        }  else if (date.slice(5, 7) === '11') {
            month = 'November'
        }  else if (date.slice(5, 7) === '12') {
            month = 'December'
        }
        return month + ' ' + date.slice(8, 10) + ',' + ' ' + date.slice(0, 4)
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
            let dates = []
            messageItems = this.state.messages.map((message) => {
                let date = this.dateFormatter(message.createdAt)
                let dateClass;
                if (dates.includes(date)) {
                    dateClass = 'hidden'
                } else {
                    dateClass = 'top-date'
                }
                dates.push(date)
                let avatar;
                if (message.authorImage) {
                    avatar = (<img src={this.imageTransalator(message.authorImage)}/>)
                } else {
                    avatar = (<div className='user-icon'>{splitSliceUpCase(message.author)}</div>)
                }
                if (message.channelId === this.props.selectedChannel.id) {
                    return   (
                        <div key={message.id} >
                            <div className={dateClass==='hidden' ? 'hidden' : 'for-border'}>
                                <div className={dateClass}><span className='top-date-span'>{date}</span></div>
                            </div>
                            <div key={message.id} className='message-holder'>                            
                                <MessageShow user={this.props.user} key={message.id} channelName={this.props.selectedChannel.channelName} channelId={this.props.channelId} message={message} messageDeleted={this.messageDeleted}/>
                                {/* <div ref={this.bottom} /> */}
                            </div>
                        </div>
                    )
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