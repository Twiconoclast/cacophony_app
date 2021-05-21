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
                    <header id='home-page-header'>
                        <Link id="homepage-logo-container" to='/login'>
                            <img id='homepage-logo' src={window.tlogo} alt="logo"/>
                            <img id='homepage-logo-text' src="https://fontmeme.com/permalink/210408/22f0e18bf49a6cbae65b62e7f5a1a78d.png" alt=""/>
                        </Link>
                        <nav id='me-links'>
                            <a href="https://www.linkedin.com/in/carol-twilight-bares-b4513694/" target="_blank"><i class="fab fa-linkedin"></i> Linkedin</a>
                            <a href="https://github.com/Twiconoclast" target="_blank"><i class="fab fa-github-square"></i> Github</a>
                            <a href="https://angel.co/u/carrie-bares" target="_blank"><i class="fab fa-angellist"></i> AngelList</a>
                        </nav>
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
                        <img className='chat-image' src={window.chat} alt="chat_image"/>
                    </div>
                    <div id='middle-caption-on-right'>
                        <h2>Create servers, topical channels, add friends, and get to chatting!</h2>
                    </div>
                </div>
                <div id='third-div' className='middle-div'>
                    <div id='middle-caption-on-left'>
                        <img id='pink-top' src={window.pink_star}/>
                        <img id='yellow-top' src={window.yellow_star}/>
                        <h2>Connect with friends, meet new people, share your thoughts for all to hear!</h2>
                        <p>(or for few to hear, if you prefer)</p>
                        <img id='small_pink-top' src={window.green_star}/>
                        <img id='green-top' src={window.smaller_pink_star}/>
                    </div>
                    <div className='middle-images'>
                        <img src={window.server_members_img} alt="server_members_image"/>
                    </div>
                </div>
                <footer>
                    <h2 id='about'>About the Developer</h2>
                    <div id='bottom-of-page'>
                        <nav id='project-nav'>
                            <h4>Projects:</h4>
                            <a href="https://cacophony-app.herokuapp.com/#/" target="_blank">Cacophony</a>
                            <a href="https://budgethacks.herokuapp.com/#/" target="_blank">BudgetHacks</a>
                            <a href="https://twiconoclast.github.io/MouseOnAMission/" target="_blank">Mouse on a Mission</a>
                        </nav>
                        <nav id='technologies'>
                            <h4>Skills:</h4>
                            <div>Ruby on Rails</div>
                            <div>Javascript</div>
                            <div>HTML</div>
                            <div>CSS</div>
                            <div>React</div>
                            <div>Redux</div>
                            <div>PostgreSQL</div>
                            <div>MongoDB</div>
                            <div>Express</div>
                        </nav>
                        <nav id='home-footer-nav'>
                            <h4>Contact:</h4>
                            <a href="https://www.linkedin.com/in/carol-twilight-bares-b4513694/" target="_blank"><i class="fab fa-linkedin"></i> Linkedin</a>
                            <a href="https://github.com/Twiconoclast" target="_blank"><i class="fab fa-github-square"></i> Github</a>
                            <a href="https://angel.co/u/carrie-bares" target="_blank"><i class="fab fa-angellist"></i> AngelList</a>
                        </nav>
                    </div>
                    <div id='subfooter'>
                        <div id='sub-subfooter'>
                            <Link id="footer-logo-container" to='/login'>
                                <img id='homepage-logo' src={window.tlogo} alt="logo"/>
                                <img id='homepage-logo-text' src="https://fontmeme.com/permalink/210408/22f0e18bf49a6cbae65b62e7f5a1a78d.png" alt=""/>
                            </Link>
                            <button id='footer-button' onClick={this.handleSigninButton}>Signup</button>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Splash