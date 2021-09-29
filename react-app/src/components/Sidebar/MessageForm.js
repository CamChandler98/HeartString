import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { goSendMessage } from "../../store/messages"


const MessageForm = ({partner}) => {
    const dispatch = useDispatch()

    const errorObj = {
        content: null
    }

    const [content, setContent] = useState('send message')
    const [errors, setErrors] = useState(errorObj)

    const user = useSelector(state => state.session.user)

    const messagePartner = (e) => {
        e.preventDefault()
        dispatch(goSendMessage(content,user.id,partner.id))
        setContent('')
    }

    const updateContent = (e) => {
        setContent(e.currentTarget.textContent)
        if(errors.content){
            setErrors({...errors, content: null})
        }
    }


    return (
        <>
        {partner && user &&
        <form
        className = 'message-form'
            onSubmit = {messagePartner}
        >
            <div className = 'message-box'>
            <div className = 'message-input'>
                <span onInput = {updateContent} value = {content}contentEditable = {true}
                suppressContentEditableWarning={true}
                >{content}</span>
                </div>
            </div>
            <button type = 'submit'>Send</button>
        </form>

        }
    </>
    )


}


export default MessageForm
