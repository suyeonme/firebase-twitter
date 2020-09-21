import React, { useState, useEffect } from 'react';
import { authService } from 'fbase';

import AppRouter from 'components/AppRouter';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <div>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...'}
    </div>
  );
}

export default App;
