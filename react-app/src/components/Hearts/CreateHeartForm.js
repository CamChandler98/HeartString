import { useSelector, useDispatch } from 'react-redux';

import { useState } from 'react';
import createHeartIcon from '../graphics/create-heart-icon.svg'
import { goAddHeart } from '../../store/hearts';

// import './CreateHeartForm.css'



const CreateHeartForm = ({closeModal}) => {

    const errorObj = {
        content:null,
        time_to_live:null
    }

    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)
    const [tempImgUrl, setTempImgUrl] = useState('')
    const [time_to_live, setTimeToLive] = useState(300)
    const [errors, setErrors] = useState(errorObj)

    const user = useSelector(state => state.session.user)

    const submitHeart = async (e) => {
        e.preventDefault()
        let user_id = user.id
        let data = await dispatch(goAddHeart({content,image,time_to_live, user_id}))
        if(data){
            setErrors({...data})
        }else{
            reset()
            if(closeModal){
                closeModal()
            }
        }
    }

    const updateContent = (e) => {
        setContent(e.target.value)
    }
    const updateTTL = (e) =>{
        setTimeToLive(e.target.value)
    }
    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file){
            setImage(file);
            let tempUrl = URL.createObjectURL(e.target.files[0])
            setTempImgUrl(tempUrl)
        }
      };
    const removeImage = (e) => {
        e.preventDefault()
       URL.revokeObjectURL(tempImgUrl)
       setTempImgUrl('')
    }
    const reset = () =>{
        setContent('')
        setTimeToLive(300)
        setImage(null)
        setTempImgUrl('')
        setErrors(errorObj)
    }

    return(<>
        {user && <form className= 'create-heart-form' onSubmit = {submitHeart}>
            <div className = 'photo-content'>
            <label htmlFor = 'heart-content'></label>
            <div className = 'text-errors'>
                <textarea
                    id = 'heart-content'
                    cols = '30'
                    rows ='5'
                    onChange= {updateContent}
                    placeholder = 'Let the world know how you feel....'
                    value = {content}
                >
                </textarea>

                </div>
            <label className = 'add-heart-photo' htmlFor ='add-photo'>
                    <input
                        id ='add-photo'
                        type="file"
                        onChange={updateFile}
                        />

                       <img src = {tempImgUrl ? tempImgUrl: createHeartIcon}
                       className = {tempImgUrl? 'heart-image': 'camera-button'}
                       onClick ={tempImgUrl ? (e)=> {e.preventDefault()} : null}
                       alt = 'submit heart'/>

                       {tempImgUrl &&
                       <button className ='remove-button'
                       onClick ={removeImage}>
                           remove
                        </button>}
                </label>
            </div>
                {errors.content &&
                    <ul className = 'errors-list'>
                    {errors.content.map((error, i) => {
                        return (
                                <li className = 'error' key = {i}>
                                    {error}
                                </li>
                        )
                    })}
                    </ul>
                 }

            <div className = 'time-to-live'>
                <label htmlFor = 'time-to-live'></label>
                <h2>How long will you bare your heart?</h2>
                <select
                    value = {time_to_live}
                    onChange = {updateTTL}
                    className = 'time-dropdown'
                    placeholder = '5 minutes'
                >
                    <option id = 'five-min' value = '300'>
                        5 Minutes
                    </option>
                    <option id='one-hour' value = '3600'>
                        1 Hour
                    </option>
                    <option id = 'one-day'value = '86400'>
                        1 Day
                    </option>
                </select>
            </div>
            {errors.time_to_live &&
                    <ul className = 'errors-list'>
                    {errors.time_to_live.map((error, i) => {
                        return (
                                <li className = 'error' key = {i}>
                                    {error}
                                </li>
                        )
                    })}
                    </ul>
                 }
            <button className= 'submit'>
                submit
            </button>
        </form>}
        </>
    )
}

export default CreateHeartForm
