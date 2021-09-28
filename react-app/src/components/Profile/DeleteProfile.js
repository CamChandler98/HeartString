import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from '../../context/Alert';
import { deleteUser } from '../../store/session';
import FormStyle from '../auth/FormStyle';
const DeleteProfile = ({user, closeModal}) => {

    const dispatch = useDispatch()
    const {alertText, setShowAlert ,setAlertText} = useAlert()

    let errorObj = {
        password: [],
        confirmPassword: []
    }

    const [errors, setErrors] = useState(errorObj);
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const updatePassword = (e) => {
        setPassword(e.target.value);
      };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
      };

    const goDelete = async (e) => {
        e.preventDefault()
        if(password !== repeatPassword){
            setErrors({...errors, confirmPassword: ['sorry looks like your passwords dont match']})

            console.log('password', password, 'repat', repeatPassword)
        }
        if(password === repeatPassword){
        const data = await dispatch(deleteUser(user.id, password))
        if (data) {

          setErrors({...data})
        }else{
          setAlertText('See you again!!')
          setShowAlert(true)
          closeModal()
        }
    }

    }
    return (
        <FormStyle>
        <form onSubmit = {goDelete} className = 'form-container'>
        <div className = 'form-group'>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          className = 'form-control'
        ></input>
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
            {errors.confirmPassword &&
            <ul className = 'errors-list'>
            {errors.confirmPassword.map((error, i) => {
                return (
                        <li className = 'error' key = {i}>
                            {error}
                        </li>
                )
            })}
            </ul>
        }
        </div>
        <button type = 'submit'>
            DELETE
        </button>
        </form>
        </FormStyle>
    )
}

export default DeleteProfile
