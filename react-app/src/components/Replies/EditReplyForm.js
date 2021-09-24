import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { goUpdateReply } from "../../store/replies"
import './EditReplyForm.css'


const EditReplyForm = ({reply, closeModal}) => {

    const dispatch = useDispatch()
    const errorObj = {
        content: null
    }
    const [content, setContent ] = useState(reply.content)
    const [errors, setErrors] = useState(errorObj)

    const updateContent = (e) => {
        setContent(e.target.value)
        if(errors.content){
            setErrors({...errors, content: null})
        }
    }

        const reset = () =>{
            setContent('')

        }

        const handleSubmit =  async (e) => {
            e.preventDefault()
            let user_id = reply.user_id
            let heart_id = reply.heart_id
            let reply_id = reply.id
            let data = await(dispatch(goUpdateReply({content,user_id,heart_id,reply_id})))
            if(data){
                setErrors({...data})
            }else{
                closeModal(e)
                reset()
            }
        }

    return (
    <form className = 'edit-reply-form' onSubmit = {handleSubmit}>
            <div className = 'text-errors'>
                <textarea
                    id = 'heart-content'
                    cols = '30'
                    rows ='5'
                    onChange= {updateContent}
                    placeholder = 'Do you have the words to open a heart?'
                    value = {content}
                >
                </textarea>
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
            <button>submit</button>
        </form>
    )
}

export default EditReplyForm
