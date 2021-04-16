import React from 'react'
import * as UserAPIUtil from '../../util/users_api_util'
import {createServerMembership} from '../../actions/server_membership_actions'
import { connect } from 'react-redux';

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
            .then((result) => {
                const searchResult = result.users.filter((user) => (user.id != this.props.user.id))
                return this.setState({autoCompleteResults: searchResult})})
        })
    }

    // handleBlur(e) {
    //     e.preventDefault()
    //     this.setState({username: '',
    //     autoCompleteResults: []})
    // }

    handleSelect(id, e) {
        e.preventDefault()
        console.log(this.props.serverId)
        this.props.createServerMembership({
            server_id: this.props.serverId,
            member_id: id
        })
        .then(() => this.setState({username: '',
        autoCompleteResults: []}))
    }

    render() {

        let autocompleteList = this.state.autoCompleteResults.map((result, idx) => (
            <li className='result-li' key={idx} onClick={(e) => this.handleSelect(result.id, e)}>{result.username}</li>
        ))

        return (
            <div className='private-search-bar'>
                <input className='search-for-friends' ref={ (input) => { this.searchBar = input } } value={ this.state.username } onChange={ this.getAutoCompleteResults.bind(this) } type='search' placeholder='Search...' />
                <ul className='results' >{autocompleteList}</ul>
            </div>
        )
    }
}

const mapSTP = (state) => ({
    user: state.sessions.currentUser
})

const mapDTP = (dispatch) => ({
    createServerMembership: (server_membership) => dispatch(createServerMembership(server_membership))
})

export default connect(mapSTP, mapDTP)(UserSearchForm)