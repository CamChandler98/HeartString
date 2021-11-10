import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getHeartNotifications } from "../../store/notification"


const HeartNotifications = () => {

    const [heartNotifcations, setHeartNotifications ] = useState({})

    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)

    let notifications = useSelector(state => state.notifications.hearts)

    useEffect(() => {
        if(sessionUser){
            dispatch(getHeartNotifications(sessionUser.id))
        }
    }, [sessionUser])

    console.log(notifications, 'Look! Replies!')


    return(
        null
    )
}


export default HeartNotifications
