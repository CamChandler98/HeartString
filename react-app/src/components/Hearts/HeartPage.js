import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { goGetHeart } from "../../store/hearts"
import { goGetHeartReplies } from "../../store/replies"
import CreateReplyForm from "../Replies/CreateReplyForm"
import RepliesPage from "../Replies/RepliesPage"

import './HeartPage.css'

const HeartPage = () => {
    const [owner,setOwner] = useState()
    const [heartReplies, setHeartReplies] = useState()
    const {heartId} = useParams()
    const dispatch = useDispatch()

    let sessionUser = useSelector(state => state.session.user)


    const updateCountdown = () => {
        let currentTime = Math.floor((new Date().getTime()/1000))
        let expiresInSec = heart.expires - currentTime
        setExpirationCountdown(expiresInSec)
    }

    useEffect(()=> {
        console.log(heartId)
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
        const interval = setInterval(() => {
            console.log('starting countdown')
            updateCountdown()
        },1000)

        if(expirationCountdown <= 0){
            console.log('it ends today', expirationCountdown)
            clearInterval(interval)
        }
        return () => {
            clearInterval(interval)
        }
    },[expirationCountdown, updateCountdown])

    useEffect(() => {
        if(heartId) {
            dispatch(goGetHeartReplies(heartId))
        }
    },[heartId])


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
            {expirationCountdown !== NaN &&
            <div className = 'a-heart-countdown'>
                <h2>Expires in: </h2>
                <span>{expirationCountdown}</span>
            </div>}
            </div>
            <div>
                <CreateReplyForm heart_id = {heart.id} />
            </div>
            <div>
                { heartReplies &&
                <RepliesPage replies = {heartReplies} />
                }
            </div>
            </div>
            </>
        }
        </div>
    )
}

export default HeartPage
