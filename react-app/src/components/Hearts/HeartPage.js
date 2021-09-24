import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { goGetHeart } from "../../store/hearts"


const HeartPage = () => {
    const [owner,setOwner] = useState()

    const {heartId} = useParams()
    const dispatch = useDispatch()

    let sessionUser = useSelector(state => state.session.user)




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


    return(
        <div className= 'home-container'>
        {heart &&
        <>
            <div className ='home-header' >
                <span>Heart</span>
            </div>
            <div className = 'focus-content'>
            <div className = 'content-countdown'>
            <div>
                <p>
                    {heart.content}
                </p>
            </div>
            <div>
                {expirationCountdown}
            </div>
            <div>

            </div>
            </div>
            </div>
            </>
        }
        </div>
    )
}

export default HeartPage
