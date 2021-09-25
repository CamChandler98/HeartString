import { useSelector, useDispatch } from 'react-redux';

import { useState } from 'react';
import createHeartIcon from '../graphics/create-heart-icon.svg'
import { goAddHeart, goUpdateHeart } from '../../store/hearts';

// import './CreateHeartForm.css'
import CreateHeartFormStyle from './CreateHeartFormStyle';


const EditHeartForm = ({closeModal, content, heart_id, content_url, time_to_live}) => {

    const errorObj = {
        content:null,
        time_to_live:null
    }

    const dispatch = useDispatch()
    const [new_content, setContent] = useState(content)
    const [contentUrl, setContentUrl] = useState(content_url || '')
    const [errors, setErrors] = useState(errorObj)

    const user = useSelector(state => state.session.user)

    const submitHeart = async (e) => {
        e.preventDefault()
        let user_id = user.id

        let data = await dispatch(goUpdateHeart({heart_id,content:new_content,content_url:contentUrl,time_to_live, user_id}))
        if(data){
            setErrors({...data})
        }else{
            reset()
            if(closeModal){
                closeModal(e)
            }
        }
    }

    const updateContent = (e) => {
        setContent(e.target.value)
    }
    const removeImage = (e) => {
        setContentUrl(null)
    }
    const restoreImgae = (e) => {
        setContentUrl(content_url)
    }
    const reset = () =>{
        setContent('')
        setErrors(errorObj)
    }

    return(<>
        {user && <form className= 'create-heart-form' onSubmit = {submitHeart} onClick = {e => e.stopPropagation()}>
            <div className = 'photo-content'>
            <label htmlFor = 'heart-content'></label>
            <div className = 'text-errors'>
                <textarea
                    id = 'heart-content'
                    cols = '30'
                    rows ='5'
                    onChange= {updateContent}
                    placeholder = 'Let the world know how you feel....'
                    value = {new_content}
                    onClick = {e => e.stopPropagation()}
                >
                </textarea>
                </div>
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
            <button className= 'submit'>
                submit
            </button>
        </form>}
        </>
    )
}

export default EditHeartForm
