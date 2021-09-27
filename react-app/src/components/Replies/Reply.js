import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnection } from "../../store/connections"
import DeleteModal from "../util/DeleteModal"
import EditMarker from "../util/EditMarker"
import EditReplyModal from "./EditReplyFormModal"
import './Reply.css'
const Reply = ({reply, i, heartOwnerId}) => {

    const dispatch = useDispatch()

    const [owner,setOwner] = useState()
    const [alreadyConnected, setAlreadyConnected] = useState(true)
    const[connected, setConnected] = useState(false)
    const [heartOwner, setHeartOwner] = useState(false)

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
            setConnected(true)
            setAlreadyConnected(true)
        }else if (sessionUserConnections && !sessionUserConnections[reply.user_id]){
            console.log('looking here', sessionUserConnections)
            console.log('you and ', reply.username, 'are NOT connected!')
            setConnected(false)
            setAlreadyConnected(false)
        }

        return () => {
            setConnected(false)
            setAlreadyConnected(true)
        }
    }, [sessionUserConnections])

    useEffect(() => {
        if(sessionUser && sessionUser.id === heartOwnerId){
            setHeartOwner(true)
        }
        else if(sessionUser && sessionUser.id !== heartOwnerId){
            setHeartOwner(false)
        }

        return () => {
            setHeartOwner(false)
        }
    },[sessionUser])

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
           {connected || owner &&
              <div className = 'connected-header'>
                <div className = 'connected-top'>
               <img className ='connected-profile-picture' src = {reply.user_profile_pic} alt ={`connection ${reply.username} profile picture`}/>
               <p>{reply.display_name}</p>
               </div>
               <span>@{reply.username}</span>
               </div>}
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
                {heartOwner && !owner && !alreadyConnected &&
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
