import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {createUser, createSession, removeErrors, receiveErrors} from '../../actions/session_actions'
import SessionForm from '../sessions/session_form'

const mapSTP = (state) => ({
    formType: 'Create an account',
    subheading: '',
    subheadingClass: 'hidden',
    user: {
        username: '',
        password: '',
        password2: ''
    },
    buttonText: "Register",
    linkAddress: '/login',
    self: '/signup',
    beforeLinkText: '',
    linkText: 'Already have an account?',
    errors: state.errors,
    areThereErrors: state.errors.length
})

const mapDTP = (dispatch) => ({
    action: (user) => dispatch(createUser(user)),
    createSession: (user) => dispatch(createSession(user)),
    removeErrors: () => dispatch(removeErrors()),
    receiveErrors: (errors) => dispatch(receiveErrors(errors))
})

export default withRouter(connect(mapSTP, mapDTP)(SessionForm))