import './RepliesPage.css'
import Reply from "./Reply"


const RepliesPage = ({replies}) => {

    return (
        <div className = 'replies-container'>
            { replies &&
                replies.map((reply,i) => {

                    return(
                        <Reply key ={reply.id} i = {i} reply = {reply} />
                    )
                })
            }
        </div>
    )
}

export default RepliesPage
