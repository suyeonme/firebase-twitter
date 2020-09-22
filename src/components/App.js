import React, { useState, useEffect } from 'react';
import { authService } from 'fbase';

import AppRouter from 'components/AppRouter';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    // Listen to change from authentication (login, logout, reset init app)
    authService.onAuthStateChanged(user => {
      if (user) {
        // Reduce object size (from user object) in order to trigger re-rendering
        // If object is too big, react doesn't trigger re-rendering
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: args => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: args => user.updateProfile(args),
    });
  };

  return (
    <div>
      {init ? (
        <AppRouter
          isLoggedIn={userObj}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        'Initializing...'
      )}
    </div>
  );
}

export default App;
