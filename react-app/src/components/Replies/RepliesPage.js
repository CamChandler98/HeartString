import './RepliesPage.css'
import Reply from "./Reply"


const RepliesPage = ({replies, heart_id, heartOwnerId}) => {

    return (
        <div className = 'replies-container'>
            { replies &&
                replies.map((reply,i) => {

                    return(
                        <Reply heart_id = {heart_id} heartOwnerId = {heartOwnerId} key ={reply.id} i = {i} reply = {reply} />
                    )
                })
            }
        </div>
    )
}

export default RepliesPage
