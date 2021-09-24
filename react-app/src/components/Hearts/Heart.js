import { useEffect, useState } from 'react'
import './Heart.css'

const Heart = ({heart}) => {
    const updateCountdown = () => {
        let currentTime = (new Date().getTime()/1000)
        let expiresInSec = heart.expires - currentTime
        setExpirationCountdown(expiresInSec)
    }

    const [expirationCountdown, setExpirationCountdown] = useState()


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
    },[expirationCountdown])



    return(
        <div className = 'heart-container'>
        <div className = 'heart-content'>
            <p className = 'heart-text'>{heart.content}</p>
            <p className = 'expiration-count'>
             {expirationCountdown >= 0 ? expirationCountdown: 'EXPIRED'}
            </p>
            <p>
                {heart.time_to_live}
            </p>
        </div>
        </div>
    )
}

export default Heart
