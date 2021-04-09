import React from "react";

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

    handleSubmit(e) {
        e.preventDefault()
        this.props.createServer(this.state)
    }

    render() {
        return (
            <div>
                form goes here!
            </div>
        )
    }

}

export default PublicServerForm