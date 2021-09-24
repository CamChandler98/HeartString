import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import './Reply.css'
const Reply = ({reply, i}) => {

    const [owner,setOwner] = useState()

    let sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        if(sessionUser && sessionUser.id === reply.user_id){
            setOwner(true)
        }else{
            setOwner(false)
        }
    },[sessionUser])

    const leftOrRight = () => {
        if( i % 2 === 0){
            return {marginLeft: 'auto'}
        }else{
            return {marginRight: 'auto'}
        }
    }
    return(
       <div style = {leftOrRight()} className = 'reply-container'>
           <p className = 'reply-text'>
                {reply.content}
           </p>
       </div>
    )
}

export default Reply
