import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from '../../context/Alert';
import { editUser } from '../../store/session';
import removeIcon from '../graphics/remove-icon.svg'
import uploadProfileIcon from '../graphics/upload-profile-picture-icon.svg'

const ManageProfile = ({closeModal}) => {
    const dispatch = useDispatch()
    const {alertText, setShowAlert ,setAlertText} = useAlert()

    const user = useSelector(state => state.session.user);

    let errorObj = {
        display_name: [],
    }
    const [errors, setErrors] = useState(errorObj);
    const [image, setImage] = useState('')
    const [tempImageUrl, setTempImageUrl] = useState(user.profile_picture_url)

    const submitEdit = () => {
        const data = await dispatch(editUser)
    }

    return()
}
