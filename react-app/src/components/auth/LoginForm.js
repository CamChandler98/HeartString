import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from '../../context/Alert';
import { login } from '../../store/session';
import FormStyle from './FormStyle';

const LoginForm = ({closeModal}) => {

    const {alertText, setShowAlert ,setAlertText} = useAlert()

  let errorObj = {
    credential: [],
    password: [],
}
  const [errors, setErrors] = useState(errorObj);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credential, password));
    if (data) {
      setErrors({...data});
    }else{
        setAlertText('logged in!')
        setShowAlert(true)
        closeModal()

    }
  };

  const updateCredential = (e) => {
    setCredential(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


  return (
      <FormStyle>
    <form className='form-container' onSubmit={onLogin}>
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
            {errors.credential &&
            <ul className = 'errors-list'>
            {errors.credential.map((error, i) => {
                return (
                        <li className = 'error' key = {i}>
                            {error}
                        </li>
                )
            })}
            </ul>
        }
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
            {errors.password &&
            <ul className = 'errors-list'>
            {errors.password.map((error, i) => {
                return (
                        <li className = 'error' key = {i}>
                            {error}
                        </li>
                )
            })}
            </ul>
        }
      </div>
        <button className= 'form-button' type='submit'>Login</button>
    </form>
    </FormStyle>
  );
};

export default LoginForm;
