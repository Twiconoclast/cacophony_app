import React from 'react'
import {Redirect} from 'react-router-dom'
import { useHistory } from "react-router-dom";

class UserHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {redirect:false}
        this.handleLogOut = this.handleLogOut.bind(this)
    }

    componentDidMount() {
        console.log(this.props.userId)
    }

    handleLogOut(e) {
        e.preventDefault()
        this.props.deleteSession()
    }

    render() {
        return (           
            <div>
                <button onClick={this.handleLogOut}>Log Out</button>
                <h3>I'm going to have User Home components!</h3>
                {/* <p>{this.props.user.username}</p> */}
            </div>
        )
    }
}

export default UserHome