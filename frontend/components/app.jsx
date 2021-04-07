import React from "react";
import { Route, HashRouter, Switch, useHistory } from 'react-router-dom';
import CreateSessionContainer from './sessions/create_session_container'
import CreateUserFormContainer from './users/create_user_form_container'
import UserHomeContainer from './users/user_home_container'
import ChannelViewContainer from './channels/channel_view_container'
import Splash from './splash'
import {AuthRoute, ProtectedRoute} from '../util/route_utils'

const App = () => (  
        <Switch>
            <AuthRoute exact path='/login' component={CreateSessionContainer}/>
            <AuthRoute exact path='/signup' component={CreateUserFormContainer}/>
            <ProtectedRoute exact path='/channels/@me' component={UserHomeContainer}/>
            <ProtectedRoute exact path='/channels/:serverId/:channelId' component={ChannelViewContainer}/>
            <AuthRoute path='/' component={Splash}/>
        </Switch>
)

export default App;