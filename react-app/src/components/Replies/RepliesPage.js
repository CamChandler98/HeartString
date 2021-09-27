import './RepliesPage.css'
import Reply from "./Reply"


const RepliesPage = ({replies, heartOwnerId}) => {

    return (
        <div className = 'replies-container'>
            { replies &&
                replies.map((reply,i) => {

                    return(
                        <Reply heartOwnerId = {heartOwnerId} key ={reply.id} i = {i} reply = {reply} />
                    )
                })
            }
        </div>
    )
}

export default RepliesPage
