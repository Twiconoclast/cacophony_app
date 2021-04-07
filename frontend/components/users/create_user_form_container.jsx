import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {createUser} from '../../actions/session_actions'
import SessionForm from '../sessions/session_form'

const mapSTP = (state) => ({
    formType: 'Create an account',
    subheading: '',
    subheadingClass: 'hidden',
    user: {
        username: '',
        password: ''
    },
    button_text: "Register",
    linkAddress: '/login',
    beforeLinkText: '',
    linkText: 'Already have an account?'
})

const mapDTP = (dispatch) => ({
    action: (user) => dispatch(createUser(user))
})

export default withRouter(connect(mapSTP, mapDTP)(SessionForm))