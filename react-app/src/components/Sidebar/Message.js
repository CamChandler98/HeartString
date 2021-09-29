import Messages from "./Messages"
import './Message.css'

const Message = ({content, user_pic}) => {

    return (
        <div>
            <img className ='connected-profile-picture' src = {user_pic} />
            <p>{content}</p>
        </div>
    )
}

export default Message
