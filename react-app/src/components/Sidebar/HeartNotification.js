import { useDispatch, } from "react-redux"
import { goSeeHeartNotification } from "../../store/notification"

import{ Link, useHistory } from 'react-router-dom'

const HeartNotification = ({heartId, replies}) => {
    let dispatch = useDispatch()
    let history = useHistory()

    const seeNotifications = () => {
        replies.forEach(async reply => await dispatch(goSeeHeartNotification(reply)))

        history.push(`/hearts/${heartId}`)
    }

    return(
        <div className = 'notification-container' onClick = { seeNotifications}>
            <span>Your heart has {replies.length} {replies.length === 1 ? 'reply': 'replies'}</span>
        </div>
    )
}


export default HeartNotification
