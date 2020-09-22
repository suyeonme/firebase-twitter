import React, { useState } from 'react';
import { authService } from 'fbase';

const AuthForm = () => {
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

  return (
    <>
      <form onSubmit={handleSubmit} className="container">
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
          className="authInput"
        />
        <input
          type="submit"
          value={newAccount ? 'Create Account' : 'Sign In'}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={handleToggle} className="authSwitch">
        {newAccount ? 'Sign In' : 'Create Account'}
      </span>
    </>
  );
};

export default AuthForm;
