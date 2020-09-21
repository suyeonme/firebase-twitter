import React from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from 'fbase';

const Profile = () => {
  const history = useHistory();

  const handleClick = () => {
    authService.signOut();
    history.push('/');
  };

  return (
    <>
      <button onClick={handleClick}>Sign Out</button>
      <span>Profile</span>
    </>
  );
};

export default Profile;
