import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMessageNotifications } from "../../store/notification"


const NotificationCount = ({connection_id, user_id}) => {
    const [notifications, setNotifications] = useState([])


    let notificationsState = useSelector( state => state.notifications.messages)

    const dispatch = useDispatch()

    useEffect(() => {
        if(!notificationsState){
            dispatch(getMessageNotifications(user_id))
        }
    },[notificationsState])

    useEffect(() => {
        if(notificationsState){
            setNotifications(Object.values.filter(notification => +notification.sender_id === +connection_id))
        }
    })

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


export default NotificationCount()
