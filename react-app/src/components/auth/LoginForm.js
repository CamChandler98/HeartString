import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import FormStyle from './FormStyle';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credential, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateCredential = (e) => {
    setCredential(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
      <FormStyle>
    <form className='form-container' onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className = 'form-group'>
        <label htmlFor='credential'>Email or Username</label>
        <input
          name='credential'
          type='text'
          placeholder='Enter email or username'
          value={credential}
          onChange={updateCredential}
          className= 'form-control'
        />
      </div>
      <div className = 'form-group'>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          className = 'form-control'
        />
        <button className= 'form-button' type='submit'>Login</button>
      </div>
    </form>
    </FormStyle>
  );
};

export default LoginForm;
