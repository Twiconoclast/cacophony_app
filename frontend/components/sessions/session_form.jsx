import React from "react";
import {Redirect, Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";

class SessionForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {user: {...this.props.user}, hiddenOrShow: 'hidden'}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDemoClick = this.handleDemoClick.bind(this)
    }

    componentDidMount() {
        console.log(this.props.errors)
        console.log(this.props.areThereErrors)
        if (this.props.areThereErrors > 0) {
            this.setState({hiddenOrShow:'show'})
            this.props.removeErrors()
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.action(this.state.user)
            .fail(() => this.componentDidMount())
    }

    handleChange(type) {
        return (e) => (this.setState({user: {[type]: e.currentTarget.value}}))
    }

    handleDemoClick(e) {
        e.preventDefault()
        this.props.createSession({username: "DemoUser", password: "demouser"})
            .then(() => this.props.history.push('/channels/@me'))
    } 

    render() {
        
        return (
            <div className='form-background'>
                <div className='blacknwhite-logo-div'>
                    <img id='logoimage' src={window.bnwlogo} alt="logo"/>
                    <img id='logotext' src="https://fontmeme.com/permalink/210407/11d12c80b616300575805a1178e3be30.png" alt="logo"/>
                </div>
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
                                    <Link id='login-link-id' to={this.props.linkAddress}>{this.props.linkText}</Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className='demo-user-login' onClick={this.handleDemoClick}>Login as DemoUser!</button>
                            <ul className={this.hiddenOrShow} id='error-list'>
                                {this.props.errors.map((error) => <li key={error}>{error}</li>)}
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SessionForm