import Messages from "./Messages"
import './Message.css'

const Message = ({content, user_pic, user_id, message_user_id}) => {

    return (
        <div className = {`message ${  user_id === message_user_id ? 'right-message': 'left-message'}`}>
            <img className ='connected-profile-picture' src = {user_pic} />
            <div className = 'text-container'>
            <p>{content}</p>
            </div>
        </div>
    )
}

export default Message
