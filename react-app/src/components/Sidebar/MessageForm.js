import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSocket } from "../../context/Socket"
import { goSendMessage } from "../../store/messages"
import sendIcon from "../graphics/send-icon.svg"

const MessageForm = ({partner}) => {

    let {socketio} = useSocket()

    const dispatch = useDispatch()
    let initialState = {content:''}
    const errorObj = {
        content: null
    }
    let editText = useRef('')
    const [content, setContent] = useState(initialState)
    const [errors, setErrors] = useState(errorObj)

    const user = useSelector(state => state.session.user)

    const messagePartner = async (e) => {
        e.preventDefault()
        let message = content.content
        content.content = ''

        let res = await dispatch(goSendMessage(message,user.id,partner.id))
        if(res === 'ok'){
            let addy = {sent_from: user.id , sent_to: partner.id }
            
            socketio.emit('connection_message', addy)
        }

        setContent({...initialState})

        let boxINeed= document.getElementById('send-message-input')

        boxINeed.innerText = ''
    }

    const updateContent = (e) => {

           content.content = e.target.innerText
    }




    return (
        <>
        {partner && user &&
        <form
        className = 'message-form'
            onSubmit = {messagePartner}
        >
            <div className = 'message-box'>
            <div className = 'message-input'
                id = 'send-message-input'
                innerText = {content.content}
                onInput = {updateContent}
                value = {content.content}
                contentEditable = {true}
                suppressContentEditableWarning={true}
                >
                </div>
            </div>
            <input className = 'send-icon' type="image" src={sendIcon}alt="Send message" />
        </form>

        }
    </>
    )


}


export default MessageForm
