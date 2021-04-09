import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {deleteSession} from '../../actions/session_actions'
import UserHome from './user_home'

const mapSTP = (state) => ({
    user: window.currentUser
})

const mapDTP = (dispatch) => ({
    deleteSession: () => dispatch(deleteSession())
})

export default withRouter(connect(mapSTP, mapDTP)(UserHome))