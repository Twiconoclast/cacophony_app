import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {createUser} from '../../actions/session_actions'
import SessionForm from '../sessions/session_form'

const mapSTP = (state) => ({
    formType: 'Sign Up',
    user: {
        username: '',
        password: ''
    }
})

const mapDTP = (dispatch) => ({
    action: (user) => dispatch(createUser(user))
})

export default withRouter(connect(mapSTP, mapDTP)(SessionForm))