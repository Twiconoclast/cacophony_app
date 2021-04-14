import React from "react";
import {Redirect, Route, withRouter} from 'react-router-dom'

class PublicServerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            owner_id: this.props.ownerId,
            server_name: '',
            private: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(type) {
        return (e) => this.setState({[type]: e.currentTarget.value})
    }

    componentDidUpdate() {

    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.createServer(this.state)
            .then((response) => this.props.history.push(`/channels/${Object.values(response.server.publicServers)[0].id}/${Object.values(response.server.publicServers)[0].defaultChannelId}`))
        this.props.closeForm(e)
        this.setState({server_name: ''})
    }

    render() {
        return (
            <div className='form-centerer'>
                <div className='public-server-form-box'>
                    <div id='form-contents'>
                        <header id='form-close-button'>
                            <button className='close-button' onClick={this.props.closeForm}>X</button>
                        </header>
                        <div id='form-text'>
                            <h2>Create a server</h2>
                            <p>Your server is where you and your friends hang out. Make yours and start talking.</p>
                        </div>
                        <div id='form-ship-div'><img id='ship-on-form' src={window.ship} alt="ship"/></div>
                        <form className='actual-server-form' onSubmit={this.handleSubmit}>
                            <div id='server-form-input-div'>
                                <label>SERVER NAME</label>
                                <input type="text" value={this.state.server_name} placeholder='Your amazing server' onChange={this.handleChange('server_name')}/>
                                <p>By creating a server, you agree to our community guildlines</p>
                            </div>
                            <footer className='button-footer'>
                                <div className='button-footer-div'>
                                    <button className='create-button' type='submit'>Create</button>
                                    <button className='back-button' onClick={this.props.closeForm}>Back</button>
                                </div>
                            </footer>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(PublicServerForm)