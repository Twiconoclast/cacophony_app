import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {createUser, createSession} from '../../actions/session_actions'
import SessionForm from '../sessions/session_form'

const mapSTP = (state) => ({
    formType: 'Create an account',
    subheading: '',
    subheadingClass: 'hidden',
    user: {
        username: '',
        password: ''
    },
    buttonText: "Register",
    linkAddress: '/login',
    beforeLinkText: '',
    linkText: 'Already have an account?'
})

const mapDTP = (dispatch) => ({
    action: (user) => dispatch(createUser(user)),
    createSession: (user) => dispatch(createSession(user)),
})

export default withRouter(connect(mapSTP, mapDTP)(SessionForm))