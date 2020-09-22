import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authService, dbService } from 'fbase';

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const history = useHistory();

  const handleClick = () => {
    authService.signOut();
    history.push('/');
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (userObj.displayName !== '') {
      // You can update display name and photo url
      await userObj.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
  };

  const handleChange = e => {
    setNewDisplayName(e.target.value);
  };

  useEffect(() => {
    const getMyTweets = async () => {
      // Filtering tweets using query
      await dbService
        .collection('tweets')
        .where('creatorId', '==', userObj.uid)
        .orderBy('createdAt')
        .get();
    };

    getMyTweets();
  }, [userObj.uid]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={handleChange}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={handleClick}>Sign Out</button>
    </>
  );
};

export default Profile;
