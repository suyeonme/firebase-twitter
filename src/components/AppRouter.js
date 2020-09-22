import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Navigation from 'components/Navigation';

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <div>
            <Route
              path="/"
              exact
              component={() => <Home userObj={userObj} />}
            />
            <Route
              path="/profile"
              exact
              component={() => (
                <Profile userObj={userObj} refreshUser={refreshUser} />
              )}
            />
          </div>
        ) : (
          <Route exact path="/" component={Auth} />
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
