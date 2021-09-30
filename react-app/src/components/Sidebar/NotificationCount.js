import { useEffect, useState } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { getMessageNotifications } from "../../store/notification"
import notificationIcon from '../graphics/notification-icon.svg'

const NotificationCount = ({connection_id,  partner,  notifications, clearNotification}) => {
    const [connectionNotifications, setConnectionNotifications] = useState([])

    const [showNotification, setShowNotification] = useState(true)

    useEffect(() => {
        if(notifications){
            setConnectionNotifications(Object.values(notifications).filter(notification => +notification.sender_id === +connection_id))
        }
    },[notifications])

    useEffect(() => {
        if(partner.id === connection_id){
            setShowNotification(false)
            clearNotification(connection_id)
        }else{
            setShowNotification(true)
        }
    }, [notifications])



    return (
        <>
        { showNotification &&  connectionNotifications && connectionNotifications.length > 0 &&
            <div className = 'heart-noti'>
                <img src = {notificationIcon} alt = 'notification' />
            </div>
        }
        </>
    )
}


export default NotificationCount
