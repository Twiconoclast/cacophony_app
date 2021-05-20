import React from "react";
import {RECEIVE_ERRORS} from '../../actions/session_actions'
import {Redirect, Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";

class SessionForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {...this.props.user, hiddenOrShow: 'hidden'}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDemoClick = this.handleDemoClick.bind(this)
    }

    componentDidMount() {

        if (this.props.areThereErrors > 0) {
            this.setState({hiddenOrShow:'show'})
            this.props.removeErrors()
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        if ((this.props.formType === 'Create an account' && this.state.password === this.state.password2) || this.props.formType === 'Welcome back!') {
            this.props.action({username: this.state.username, password: this.state.password})
                .fail(() => this.componentDidMount())
        } else {
            this.props.receiveErrors({
                    responseJSON: {
                        errors: ["Password fields must match"]
                }
            })
            this.componentDidMount()
        }
    }

    handleChange(type) {
        return (e) => (this.setState({[type]: e.currentTarget.value}))
    }

    handleDemoClick(e) {
        e.preventDefault()
        this.props.createSession({username: "DemoUser", password: "demouser"})
    } 

    render() {
 
        return (
            <div className='form-background'>
                <Link to='/'>
                    <div className='blacknwhite-logo-div'>
                        <img id='logoimage' src={window.bnwlogo} alt="logo"/>
                        <img id='logotext' src="https://fontmeme.com/permalink/210407/11d12c80b616300575805a1178e3be30.png" alt="logo"/>
                    </div>
                </Link>
                <div id='login-form-container'>
                    <form id='login-form' onSubmit={this.handleSubmit}>
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
                                <label className={this.props.formType === 'Create an account' ? 'sessionFormLabel' : 'hidden'}>CONFIRM PASSWORD
                                    <input className='input-box' type="password" value={this.state.password2} onChange={this.handleChange('password2')}/>
                                </label>
                                <button className='submit-button'>{this.props.buttonText}</button>
                                <div className='after-form-link'>
                                    {this.props.beforeLinkText}
                                    <Link id='login-link-id' to={this.props.linkAddress}>{this.props.linkText}</Link>
                                </div>
                            </div>
                            <ul className={this.hiddenOrShow} id='error-list'>
                                {this.props.errors.map((error) => <li key={error}>{error}</li>)}
                            </ul>
                        </div>
                        <div id='demoStuff'>
                            <img id='demoavatar' src={window.demouser} alt="demouser"/>
                            <button className='demo-user-login' onClick={this.handleDemoClick}>Login as DemoUser!</button>  
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SessionForm