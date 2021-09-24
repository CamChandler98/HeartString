import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { goAddReply } from "../../store/replies"


const CreateReplyForm = ({heart_id}) => {

    const dispatch = useDispatch()
    const errorObj = {
        content: null
    }
    const [content, setContent ] = useState('')
    const [errors, setErrors] = useState(errorObj)

    const user = useSelector(state => state.session.user)

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
        let user_id = user.id
        let data = await(dispatch(goAddReply({content,user_id,heart_id})))
        if(data){
            setErrors({...data})
        }else{
            reset()
        }
    }



    return (
        <form className = 'create-reply-form' onSubmit = {handleSubmit}>
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
            </div>
            <button>submit</button>
        </form>
    )
}

export default CreateReplyForm
