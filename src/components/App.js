import React, { useState, useEffect } from 'react';
import { authService } from 'fbase';

import AppRouter from 'components/AppRouter';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    // Listen to change from authentication (login, logout, reset init app)
    authService.onAuthStateChanged(user => {
      if (user) setUserObj(user);
      setInit(true);
    });
  }, []);

  return (
    <div>
      {init ? (
        <AppRouter isLoggedIn={userObj} userObj={userObj} />
      ) : (
        'Initializing...'
      )}
    </div>
  );
}

export default App;
