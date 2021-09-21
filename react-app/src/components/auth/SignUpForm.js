import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

import uploadProfileIcon from './graphics/upload-profile-picture-icon.svg'
import removeIcon from './graphics/remove-icon.svg'
const SignUpForm = () => {

    console.log('displaying signup form')
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [image, setImage] = useState('')
  const [tempImageUrl, setTempImageUrl] = useState('')
  const [displayName, setDisplayName] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, image, displayName));
      if (data) {
        setErrors(data)
      }
    }
    else{
        setErrors(["Looks like your passwords don't match"])
    }
  };

  const removeImage = (e) => {
      e.preventDefault()
      URL.revokeObjectURL(tempImageUrl)
      setImage(null)
      setTempImageUrl('')
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateDisplayName = (e) => {
    setDisplayName(e.target.value);
  };
  const updateImage = (e) => {
    e.preventDefault()
    const file = e.target.files[0];
    if (file){
        setImage(file);
        let tempUrl = URL.createObjectURL(e.target.files[0])
        setTempImageUrl(tempUrl)
    }
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form
    onSubmit={onSignUp}
    className = 'form-container'
    >
        <h2 className = 'form-header'>Create your account</h2>
        <label htmlFor= 'profile-pic' className = 'profile-pic-container'>
            <input
                type='file'
                id = 'profile-pic'
                onChange = {updateImage}
            />
            <img
                src = {tempImageUrl ? tempImageUrl: uploadProfileIcon}
                className = {tempImageUrl ? 'profile-pic':'profile-pic placeholder'}
            />
            {
                tempImageUrl &&
                <img src = {removeIcon} alt = 'remove profile'
                     onClick= {removeImage}
                     className = 'remove'
                />
            }
        </label>
      <div
      >
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className = 'form-fields'>
          <div className = 'field-child'>
      <div className = 'form-group'>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          className = 'form-control'
        ></input>
      </div>
      <div className = 'form-group'>
        <label>Display Name</label>
        <input
          type='text'
          name='display_name'
          onChange={updateDisplayName}
          value={displayName}
          className = 'form-control'
        ></input>
      </div>
      <div className = 'form-group'>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          className = 'form-control'
        ></input>
      </div>
      </div>
      <div className = 'field-child'>
      <div className = 'form-group'>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          className = 'form-control'
        ></input>
      </div>
      <div className = 'form-group'>
        <label>Confirm Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          className = 'form-control'
        ></input>
        </div>
        </div>
      </div>
      <button className = 'form-button' type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
