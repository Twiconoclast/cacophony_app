import React from 'react'
import { connect } from 'react-redux';
import {createSession} from '../../actions/session_actions'
import { withRouter } from 'react-router-dom';
import SessionForm from './session_form'

const mapSTP = (state) => ({
    formType: 'Sign In',
    user: {
        username: '',
        password: ''
    }
})

const mapDTP = (dispatch) => ({
    action: (formUser) => dispatch(createSession(formUser))
})

export default withRouter(connect(mapSTP, mapDTP)(SessionForm))