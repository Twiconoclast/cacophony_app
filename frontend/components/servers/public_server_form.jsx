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
        console.log(this.state)
        let serverId;
        this.props.createServer(this.state)
            .then((response) => this.props.history.push(`/channels/${Object.values(response.server.publicServers)[0].id}/${Object.values(response.server.publicServers)[0].id}`))
    }

    closeForm() {
        e.preventDefault()
    }

    render() {
        return (
            <div>
                <button className='close-button' onClick={this.closeForm}>X</button>
                <h2>Create a server</h2>
                <p>Your server is where you and your friends hang out. Make yours and start talking.</p>
                <form onSubmit={this.handleSubmit}>
                    <label>SERVER NAME
                        <input type="text" value={this.state.server_name} onChange={this.handleChange('server_name')}/>
                    </label>
                    <button>Create</button>
                </form>
                <button onClick={this.closeForm}>Back</button>
            </div>
        )
    }

}

export default withRouter(PublicServerForm)