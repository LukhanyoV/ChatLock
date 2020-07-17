import React, {Fragment} from 'react';

// layouts
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';

// the pages
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Hello from './components/pages/Hello';
import Dashboard from './components/pages/Dashboard';

import BlogState from './context/blog/BlogState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <BlogState>
        <AlertState>
          <BrowserRouter>
            <Fragment>
              <Navbar />
              <Alerts />
              <Switch>
                <Route exact path="/" component={Hello} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </Fragment>
          </BrowserRouter>
        </AlertState>
      </BlogState>
    </AuthState>
  );
}

export default App;
