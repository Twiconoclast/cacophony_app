import React from "react";
import { Route, HashRouter, Switch } from 'react-router-dom';
import CreateSessionContainer from './sessions/create_session_container'
import CreateUserFormContainer from './users/create_user_form_container'
import Splash from './splash'

const App = () => (
    <div>
        <HashRouter>
            <Switch>
                <AuthRoute exact path='/login' component={CreateSessionContainer}/>
                <AuthRoute exact path='/signup' component={CreateUserFormContainer}/>
                <ProtectedRoute exact path='/channels/:userId'/>
                <ProtectedRoute exact path='/channels/:serverId/:channelId'/>
                <Route path='/' component={Splash}/>
            </Switch>
        </HashRouter>
    </div>
)

export default App;