import React from "react";
import { Route, HashRouter, Switch, useHistory, Redirect } from 'react-router-dom';
import CreateSessionContainer from './sessions/create_session_container'
import CreateUserFormContainer from './users/create_user_form_container'
import UserHomeContainer from './users/user_home_container'
import ChannelViewContainer from './channels/channel_view_container'
import SplashContainer from './splash_container'
import {AuthRoute, ProtectedRoute} from '../util/route_utils'

const App = () => (  
        <Switch>
            <AuthRoute exact path='/login' component={CreateSessionContainer}/>
            <AuthRoute exact path='/signup' component={CreateUserFormContainer}/>
            <ProtectedRoute exact path='/channels/@me' component={UserHomeContainer}/>
            <ProtectedRoute exact path='/channels/:serverId/:channelId' component={ChannelViewContainer}/>
            <AuthRoute exact path='/' component={SplashContainer}/>
            <Route render={() => <Redirect to="/" />} />
        </Switch>
)

export default App;