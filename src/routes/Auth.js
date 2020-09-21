import React, { useState } from 'react';
import { authService, firebaseInstance } from 'fbase';

const Auth = () => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [newAccount, setNewAccout] = useState(true);
  const [error, setError] = useState('');
  const { email, password } = userInfo;

  const handleToggle = () => setNewAccout(prev => !prev);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
        console.log(data);
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClickSocial = async e => {
    const { name } = e.target;
    let provider;

    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    await authService.signInWithPopup(provider);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
        />
        <input
          type="submit"
          value={newAccount ? 'Create Account' : 'Sign In'}
        />
        {error}
      </form>
      <span onClick={handleToggle}>
        {newAccount ? 'Sign In' : 'Create Account'}
      </span>
      <button name="google" onClick={handleClickSocial}>
        Continue with Google
      </button>
      <button name="github" onClick={handleClickSocial}>
        Continue with Github
      </button>
    </div>
  );
};

export default Auth;
