import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from '../../context/Alert';
import { editUser } from '../../store/session';
import FormStyle from '../auth/FormStyle';
import removeIcon from '../graphics/remove-icon.svg'
import uploadProfileIcon from '../graphics/upload-profile-picture-icon.svg'
import DeleteProfileModal from './DeleteProfileModal';

const ManageProfile = ({closeModal, user}) => {
    const dispatch = useDispatch()
    const {alertText, setShowAlert ,setAlertText} = useAlert()


    let errorObj = {
        display_name: [],
    }
    const [errors, setErrors] = useState(errorObj);
    const [image, setImage] = useState('')
    const [tempImageUrl, setTempImageUrl] = useState(user.profile_picture_url)
    const [displayName, setDisplayName] = useState(user.display_name)

    const submitEdit = async (e) => {
        e.preventDefault()
        const data = await dispatch(editUser(user.id,displayName,image ,tempImageUrl))
        if (data) {
            console.log('setting these errors on the form ->>>', data)
          setErrors({...data})
        }else{
          setAlertText('Edited!')
          setShowAlert(true)
          closeModal()
        }

    }
    const removeImage = (e) => {
        e.preventDefault()
        URL.revokeObjectURL(tempImageUrl)
        setImage(null)
        setTempImageUrl('')
    }

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

    return(
        <FormStyle>
        <form
        onSubmit={submitEdit}
        className = 'form-container'
        >
            <h2 className = 'form-header'>Edit Information</h2>
            <label htmlFor= 'profile-pic' className = 'profile-pic-container'>
                <input
                    type='file'
                    id = 'profile-pic'
                    onChange = {updateImage}
                    accept="image/*"
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
            <div className = 'form-group'>
        <label>Display Name</label>
        <input
          type='text'
          name='display_name'
          onChange={updateDisplayName}
          value={displayName}
          className = 'form-control'
        ></input>
            {errors.display_name &&
            <ul className = 'errors-list'>
            {errors.display_name.map((error, i) => {
                return (
                        <li className = 'error' key = {i}>
                            {error}
                        </li>
                )
            })}
            </ul>
        }
        </div>
        <button className = 'form-button' type='submit'>Edit</button>
            </form>
            </FormStyle>
    )
}

export default ManageProfile
