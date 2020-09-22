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
    <div className="container">
      <form onSubmit={handleSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={handleChange}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={handleClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
