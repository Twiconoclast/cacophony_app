import React from "react";
import {Redirect, Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";

class SessionForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = this.props.user
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        if (window.currentUser) return <Redirect to='/channels/@me'/>
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.action(this.state)
            .then(() => this.props.history.push('/channels/@me'))
    }

    handleChange(type) {
        return (e) => (this.setState({[type]: e.currentTarget.value}))
    }

    render() {
        
        return (
            <div className='form-background'>
                <div id='login-form-container'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='form-align-contents'>
                            <h3 className='form-heading'>{this.props.formType}</h3>
                            <p className={this.props.subheadingClass}>{this.props.subheading}</p>
                            <div className='actual-form-contents'>
                                <label className='sessionFormLabel'>USERNAME 
                                    <input className='input-box' type="text" value={this.state.username} onChange={this.handleChange('username')}/>
                                </label>
                                <label className='sessionFormLabel'>PASSWORD
                                    <input className='input-box' type="password" value={this.state.password} onChange={this.handleChange('password')}/>
                                </label>
                                <button className='submit-button'>{this.props.buttonText}</button>
                                <div className='after-form-link'>
                                    {this.props.beforeLinkText}
                                    <Link to={this.props.linkAddress}>{this.props.linkText}</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SessionForm