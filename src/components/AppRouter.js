import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Navigation from 'components/Navigation';

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <>
      <Router>
        {isLoggedIn && <Navigation />}
        <Switch>
          {isLoggedIn ? (
            <>
              <Route
                path="/"
                exact
                component={() => <Home userObj={userObj} />}
              />
              <Route exact path="/profile" component={Profile} />
            </>
          ) : (
            <Route exact path="/" component={Auth} />
          )}
        </Switch>
      </Router>
    </>
  );
};

export default AppRouter;
