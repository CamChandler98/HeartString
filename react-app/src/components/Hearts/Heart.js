import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EditHeartModal from './EditHeartFormModal'
import './Heart.css'

const Heart = ({heart}) => {

    const [owner, setOwner] = useState(false)

    let sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        if(sessionUser && sessionUser.id === heart.user_id){
            setOwner(true)
        }else{
            setOwner(false)
        }
    })
    const [expirationCountdown, setExpirationCountdown] = useState(heart.expires - Math.floor((new Date().getTime()/1000)))

    const updateCountdown = () => {
        let currentTime = Math.floor((new Date().getTime()/1000))
        let expiresInSec = heart.expires - currentTime
        setExpirationCountdown(expiresInSec)
    }



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



    return(
        <div className = 'heart-container'>
        <div className = 'heart-content'>
            <p className = 'heart-text'>{heart.content}</p>
                <h3>Expires in :</h3>
            <p className = 'expiration-count'>
             {expirationCountdown > 0 ? expirationCountdown: 'EXPIRED'}
            </p>
        </div>
        <div>
            {owner && <EditHeartModal content = {heart.content} heart_id = {heart.id} content_url = {heart.content_url} time_to_live = {heart.time_to_live} />}
        </div>
        </div>
    )
}

export default Heart
