import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMessageNotifications } from "../../store/notification"


const NotificationCount = ({connection_id, notifications}) => {
    const [connectionNotifications, setConnectionNotifications] = useState([])



    useEffect(() => {
        if(notifications){
            setConnectionNotifications(Object.values(notifications).filter(notification => +notification.sender_id === +connection_id))
        }
    },[notifications])

    return (
        <>
        { connectionNotifications && connectionNotifications.length > 0 &&
            <div>
                <span>
                    {connectionNotifications.length}
                </span>
            </div>
        }
        </>
    )
}


export default NotificationCount
