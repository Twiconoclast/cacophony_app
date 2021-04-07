import React from "react";
import {Redirect} from 'react-router-dom'
import { useHistory } from "react-router-dom";

class SessionForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = this.props.user
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.action(this.state)
        this.props.history.push('/channels/@me')
    }

    handleChange(type) {
        return (e) => (this.setState({[type]: e.currentTarget.value}))
    }

    render() {
        
        return (
            <div className='login-form'>
                <h3>{this.props.formType}</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>Username: 
                        <input type="text" value={this.state.username} onChange={this.handleChange('username')}/>
                    </label>
                    <label>Password: 
                        <input type="password" value={this.state.password} onChange={this.handleChange('password')}/>
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default SessionForm