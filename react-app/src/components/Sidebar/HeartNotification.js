import { useDispatch, } from "react-redux"
import { goSeeHeartNotification } from "../../store/notification"

import{ Link, useHistory } from 'react-router-dom'
import heartIcon from '../graphics/heart-notify.svg'
const HeartNotification = ({heartId, replies}) => {
    let dispatch = useDispatch()
    let history = useHistory()

    const seeNotifications = () => {
        replies.forEach(async reply => await dispatch(goSeeHeartNotification(reply)))

        history.push(`/hearts/${heartId}`)
    }

    return(
        <div className = 'notification-container' onClick = { seeNotifications}>
            <img src = {heartIcon} alt = '' />
            <span>Your heart has {replies.length} {replies.length === 1 ? 'reply': 'replies'}</span>
        </div>
    )
}


export default HeartNotification
