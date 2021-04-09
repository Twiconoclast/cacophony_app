import React from 'react'
import {Redirect} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import PublicServerForm from '../servers/new_server_form'

class UserHome extends React.Component {
    constructor(props) {
        super(props)
        this.handleLogOut = this.handleLogOut.bind(this)
        this.state = this.props.user
    }

    componentDidMount() {
        console.log(this.props.user)
        console.log(this.state)
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
                <PublicServerForm ownerId={this.props.user} createServer={this.createServer}/>
            </div>
        )
    }
}

export default UserHome