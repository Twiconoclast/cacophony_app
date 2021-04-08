import React from 'react'
import { connect } from 'react-redux';
import {createSession} from '../../actions/session_actions'
import { withRouter } from 'react-router-dom';
import SessionForm from './session_form'

const mapSTP = (state) => ({
    formType: 'Welcome back!',
    subheading: "We're so excited to see you again!",
    subheadingClass: 'show',
    user: {
        username: '',
        password: ''
    },
    buttonText: "Login",
    linkAddress: '/signup',
    beforeLinkText: 'Need an account? ',
    linkText: 'Register'
})

const mapDTP = (dispatch) => ({
    action: (user) => dispatch(createSession(user)),
    createSession: (user) => dispatch(createSession(user)),
})

export default withRouter(connect(mapSTP, mapDTP)(SessionForm))