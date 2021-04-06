import React from 'react'
import { connect } from 'react-redux';
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

export default connect(mapSTP, mapDTP)(SessionForm)