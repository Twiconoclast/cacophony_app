import Splash from './splash'
import React from 'react'
import { connect } from 'react-redux';
import {createSession} from '../actions/session_actions'
import { Redirect, Link, withRouter } from 'react-router-dom';

const mDPT = (dispatch) => ({
    createSession: (user) => dispatch(createSession(user))
})

export default withRouter(connect(null, mDPT)(Splash))