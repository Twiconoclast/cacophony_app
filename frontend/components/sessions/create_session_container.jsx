import React from 'react'
import { connect } from 'react-redux';
import {createSession, removeErrors, receiveErrors} from '../../actions/session_actions'
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
    self: '/login',
    beforeLinkText: 'Need an account? ',
    linkText: 'Register',
    errors: state.errors,
    areThereErrors: state.errors.length
})

const mapDTP = (dispatch) => ({
    action: (user) => dispatch(createSession(user)),
    createSession: (user) => dispatch(createSession(user)),
    removeErrors: () => dispatch(removeErrors()),
    receiveErrors: (errors) => dispatch(receiveErrors(errors))
})

export default withRouter(connect(mapSTP, mapDTP)(SessionForm))