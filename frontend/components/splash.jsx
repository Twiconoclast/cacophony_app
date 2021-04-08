import React from 'react'
import { Redirect, Link } from 'react-router-dom';

class Splash extends React.Component {
    constructor (props){
        super(props)
        this.handleDemoClick = this.handleDemoClick.bind(this)
        this.handleSigninButton = this.handleSigninButton.bind(this)
        this.handleLoginButton = this.handleLoginButton.bind(this)
    }

    handleLoginButton(e) {
        e.preventDefault()
        this.props.history.push('/login')
    }

    handleSigninButton(e) {
        e.preventDefault()
        this.props.history.push('/signup')
    }

    handleDemoClick(e) {
        e.preventDefault()
        this.props.createSession({username: "DemoUser", password: "demouser"})
            .then(() => this.props.history.push('/channels/@me'))
    } 

    render () {
        return (
            <div id='home-page'>
                <div id='top-of-page'>
                    <header>
                        <Link id="homepage-logo-container" to='/login'>
                            <img id='homepage-logo' src={window.tlogo} alt="logo"/>
                            <img id='homepage-logo-text' src="https://fontmeme.com/permalink/210408/22f0e18bf49a6cbae65b62e7f5a1a78d.png" alt=""/>
                        </Link>
                        <div id='button-holder'>
                            <button id='login-button' onClick={this.handleLoginButton}>Login</button>
                        </div>
                    </header>
                    <div id='middle-buttons'>
                        <h1 id='welcome'>Welcome to Cacophony!</h1>
                        <p id='subwelcome'>Cacophony is a chat service based on Discord. Please click the link below to create an account or click the DemoUser login for immediate access. Thanks for coming!</p>
                        <div id='centerer'>
                            <button id='home-demo-button' className='demo-user-login' onClick={this.handleDemoClick}>DemoUserLogin</button>
                            <button id='home-signup-button' onClick={this.handleSigninButton}>Signup</button>
                        </div>
                    </div>
                </div>
                <div className='middle-div'>
                    <div className='middle-images'>
                        <img src={window.ballons} alt="balloons"/>
                    </div>
                    <div id='middle-caption-on-right'>
                        <h2>There's so much great stuff to say about this app!</h2>
                        <p>It's going be right here</p>
                    </div>
                </div>
                <div id='third-div' className='middle-div'>
                    <div className='middle-images'>
                        <img src={window.tcastle} alt="castle"/>
                    </div>
                    <div id='middle-caption-on-left'>
                        <h2>Even more great things!</h2>
                        <p>Right here!!!</p>
                    </div>
                </div>
                <footer>
                    <nav id='home-footer-nav'></nav>
                    <div id='subfooter'>
                        <button id='footer-button' onClick={this.handleSigninButton}>Signup</button>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Splash