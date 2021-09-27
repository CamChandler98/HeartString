import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnection } from "../../store/connections"
import DeleteModal from "../util/DeleteModal"
import EditMarker from "../util/EditMarker"
import EditReplyModal from "./EditReplyFormModal"
import './Reply.css'
const Reply = ({reply, i}) => {

    const dispatch = useDispatch()

    const [owner,setOwner] = useState()
    const [alreadyConnected, setAlreadyConnected] = useState(true)

    let sessionUser = useSelector(state => state.session.user)
    let sessionUserConnections = useSelector(state => state.connections)

    useEffect(() => {
        if(sessionUser && sessionUser.id === reply.user_id){
            setOwner(true)
        }else{
            setOwner(false)
        }
    },[sessionUser])

    useEffect(() => {
        if(sessionUserConnections && sessionUserConnections[reply.user_id]){
            console.log('looking here', sessionUserConnections)
            console.log('you and ', reply.username, 'are connected!')
            setAlreadyConnected(true)
        }else if (sessionUserConnections && !sessionUserConnections[reply.user_id]){
            console.log('looking here', sessionUserConnections)
            console.log('you and ', reply.username, 'are NOT connected!')
            setAlreadyConnected(false)
        }
    }, [sessionUserConnections])

    const leftOrRight = () => {
        if( i % 2 === 0){
            return {marginLeft: 'auto'}
        }else{
            return {marginRight: 'auto'}
        }

    }

    const goMakeConnection = (user_one, user_two) => {
        dispatch(addConnection(user_one,user_two))
    }


    return(
       <div style = {leftOrRight()} className = 'reply-container'>
           <span>{reply.username}</span>
           <p className = 'reply-text'>
                {reply.content}
           </p>
          <div className = 'crud-buttons'>
             <EditMarker obj = {reply} />
               {owner && <div className = 'edit-reply'>
                <EditReplyModal  reply = {reply} />
                </div>}
                {owner && <div className = 'delete-reply'>
                        <DeleteModal id = {reply.id} type = {'reply'} onClick= {e => e.stopPropagation()} />
                </div>}
           </div>
                {!owner && !alreadyConnected &&
                    <div>
                        <button
                        onClick ={() => goMakeConnection(sessionUser.id, reply.user_id)}
                        >
                            Connect!
                        </button>
                    </div>
                }

       </div>
    )
}

export default Reply
