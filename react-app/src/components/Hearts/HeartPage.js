import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { goCloseHeart, goGetHeart } from "../../store/hearts"
import { goGetHeartReplies } from "../../store/replies"
import CreateReplyForm from "../Replies/CreateReplyForm"
import RepliesPage from "../Replies/RepliesPage"

import './HeartPage.css'

const HeartPage = () => {
    const [owner,setOwner] = useState()
    const [heartReplies, setHeartReplies] = useState()
    const [open,setOpen] = useState(false)
    const {heartId} = useParams()
    const dispatch = useDispatch()

    let sessionUser = useSelector(state => state.session.user)


    const updateCountdown = () => {
        let currentTime = Math.floor((new Date().getTime()/1000))
        let expiresInSec = heart.expires - currentTime
        setExpirationCountdown(expiresInSec)
    }

    useEffect(()=> {

        if(heartId){
            dispatch(goGetHeart(heartId))
        }
    },[heartId])



    let heart = useSelector(state => state.hearts.all[heartId])

    useEffect(() => {
        if(heart && sessionUser && sessionUser.id === heart.user_id){
            setOwner(true)
        }else{
            setOwner(false)
        }
    },[heart,sessionUser])

    const [expirationCountdown, setExpirationCountdown] = useState(heart?.expires - Math.floor((new Date().getTime()/1000)))


    useEffect(() => {
        let i
        if (heart && heart.open){
        const interval = setInterval(() => {

            updateCountdown()
        },1000)

        if(expirationCountdown <= 0){
     
            dispatch(goCloseHeart(heart.id))
            setOpen(false)
            clearInterval(interval)
        }
        return () => {
            clearInterval(interval)
        }}
    },[expirationCountdown, updateCountdown, heart])

    useEffect(() => {
        if(heartId) {
            dispatch(goGetHeartReplies(heartId))
        }
    },[heartId])

    useEffect(()=> {
        if(heart){
            setOpen(heart.open)
        }
    },[heart])


    let replyState = useSelector(state => state.replies.heart)

    useEffect(()=> {

        if(replyState){
            setHeartReplies(Object.values(replyState).reverse())
        }


    },[replyState])
    return(
        <div className= 'home-container'>
        {heart &&
        <>
            <div className ='home-header' >
                <span>Heart</span>
            </div>
            <div className = 'focus-content'>
            <div className = 'content-countdown'>
            <div className = 'a-heart-content'>
                <p>
                    {heart.content}
                </p>
            </div>
            {!Number.isNaN(expirationCountdown  )&& expirationCountdown&&
            <div className = 'a-heart-countdown'>
                <h2>Expires in: </h2>
               { expirationCountdown && !Number.isNaN(expirationCountdown) && <span>
                {expirationCountdown > 0 ? expirationCountdown: 'EXPIRED'}</span> }
            </div>}
            </div>
            <div>
             {!owner && open && sessionUser && <CreateReplyForm heart_id = {heart.id} />}
             {!owner && !open &&
                <h2 className = 'closed-heart-text'>
                    Sorry this heart is heart is closed, but you can still take a look at the replies
                </h2>
             }
            </div>
            <div>
                { heartReplies &&
                <RepliesPage heart_id = {heart.id} heartOwnerId = {heart.user_id} replies = {heartReplies} />
                }
            </div>
            </div>
            </>
        }
        </div>
    )
}

export default HeartPage
