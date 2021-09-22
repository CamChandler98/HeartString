import { useSelector, useDispatch } from 'react-redux';

import { useState } from 'react';
import createHeartIcon from '../graphics/create-heart-icon.svg'
import { goAddHeart } from '../../store/hearts';
const CreateHeartForm = () => {


    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)
    const [tempImgUrl, setTempImgUrl] = useState('')
    const [time_to_live, setTimeToLive] = useState(300)

    const user = useSelector(state => state.session.user)

    const submitHeart = (e) => {
        e.preventDefault()
        let user_id = user.id
        dispatch(goAddHeart({content,image,time_to_live, user_id}))
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

    return(
        <>
        {user && <form onSubmit = {submitHeart}>
            <div>
            <label htmlFor = 'review-content'></label>
                <textarea
                    id = 'review-content'
                    cols = '30'
                    rows ='5'
                    onChange= {updateContent}
                    placeholder = 'Let the world know how you feel'
                    value = {content}
                >
                </textarea>
            </div>
            <div>
            <label htmlFor ='add-photo'>
                    <input id ='add-photo' type="file" onChange={updateFile} />
                       <img src = {tempImgUrl ? tempImgUrl: createHeartIcon}
                       className = {tempImgUrl? null: 'camera-button'}
                       onClick ={tempImgUrl ? (e)=> {e.preventDefault()} : null}
                       alt = 'submit-photo'/>
                       {tempImgUrl &&
                       <button className ='remove'
                       onClick ={ e => {
                           removeImage(e)
                       }}>
                           remove
                        </button>}
                    </label>
            </div>

            <div>
                <label htmlFor = 'time-to-live'></label>

                <select
                    value = {time_to_live}
                    onChange = {updateTTL}
                >
                    <option value = '300'>
                        5 Minutes
                    </option>
                    <option value = '3600'>
                        1 Hour
                    </option>
                    <option value = '86400'>
                        1 Day
                    </option>
                </select>
            </div>
            <button>
                submit
            </button>
        </form>}
        </>
    )
}

export default CreateHeartForm
