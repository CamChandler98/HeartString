import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMessageNotifications } from "../../store/notification"


const NotificationCount = ({connection_id, notifications}) => {
    const [notifications, setNotifications] = useState([])


    let notificationsState = useSelector( state => state.notifications.messages)

    const dispatch = useDispatch()

    useEffect(() => {
            dispatch(getMessageNotifications(user_id))
    },[connection_id])

    useEffect(() => {
        if(notificationsState){
            setNotifications(Object.values(notificationsState).filter(notification => +notification.sender_id === +connection_id))
        }
    },[notificationsState])

    return (
        <>
        { notifications &&
            <div>
                <span>
                    {notifications.length}
                </span>
            </div>
        }
        </>
    )
}


export default NotificationCount
