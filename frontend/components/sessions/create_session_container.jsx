import React from 'react'
import { connect } from 'react-redux';
import SessionForm from './session_form'

const mapSTP = (state) => ({
    formType: 'Sign In',
    user: {
        username: '',
        password: ''
    }
})

const mapDTP = (dispatch) => ({
    action: (user) => dispatch(createSession(user))
})

export default connect(mapSTP, mapDTP)(SessionForm)