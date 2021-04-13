import React from 'react'
import * as UserAPIUtil from '../../util/users_api_util'
import * as ServerMembershipAPIUtil from '../../util/server_membership_api_util'

class UserSearchForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            autoCompleteResults: [],
            userSelected: {},
            showUserSelected: false
        }
        this.handleSelect = this.handleSelect.bind(this)
    }

    getAutoCompleteResults(e) {
        this.setState({username: e.currentTarget.value}, 
        () => {UserAPIUtil.fetchUserByUsername(this.state.username)
            .then((result) => (this.setState({autoCompleteResults: result.users})))
        })
    }

    handleSelect(id) {
        ServerMembershipAPIUtil.createServerMembership({
            server_id: this.props.serverId,
            member_id: id
        })
        .then(() => this.setState({username: '',
        autoCompleteResults: []}))
    }

    render() {

        let autocompleteList = this.state.autoCompleteResults.map((result, idx) => (
            <li key={idx} onClick={this.handleSelect(result.id)}>{result.username}</li>
        ))

        return (
            <div>
                <input ref={ (input) => { this.searchBar = input } } value={ this.state.username } onChange={ this.getAutoCompleteResults.bind(this) } type='text' placeholder='Search...' />
                <ul>{autocompleteList}</ul>
            </div>
        )
    }
}

export default UserSearchForm