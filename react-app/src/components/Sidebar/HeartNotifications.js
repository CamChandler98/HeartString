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

    useEffect(() => {
        if(Object.keys(notifications).length > 0){
            let temp =  {}
            console.log(notifications, 'okay')
            for (let notification in notifications){
                let currentNoti = notifications[notification]
                let heartId = currentNoti.heart_id

                if(!temp[heartId]){
                    temp[heartId] = [ currentNoti.id]
                }else{
                    temp[heartId].push(currentNoti.id)
                }
            }
            setHeartNotifications({...temp})
        }
    }, [notifications])

    console.log(notifications, 'Look! Replies!')


    return(
        null
    )
}


export default HeartNotifications
