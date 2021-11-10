import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getHeartNotifications } from "../../store/notification"
import HeartNotification from "./HeartNotification"


const HeartNotifications = () => {

    const [heartNotifcations, setHeartNotifications ] = useState([])

    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)

    let notifications = useSelector(state => state.notifications.hearts)

    useEffect(() => {
        if(sessionUser){
            dispatch(getHeartNotifications(sessionUser.id))
        }
    }, [sessionUser])

    useEffect(() => {
        if(notifications){
            let temp =  {}
            for (let notification in notifications){
                let currentNoti = notifications[notification]
                let heartId = currentNoti.heart_id

                if(!temp[heartId]){
                    temp[heartId] = [ currentNoti.id]
                }else{
                    temp[heartId].push(currentNoti.id)
                }
            }
            setHeartNotifications(Object.entries(temp))
        }
    }, [notifications])


    return(
       <div>
           {heartNotifcations.length > 0 &&
            heartNotifcations.map(notification => {
                console.log('looking', notification)
               return( <HeartNotification heartId = {notification[0]} replies = {notification[1]} />)
            })
           }
           {sessionUser && heartNotifcations && heartNotifcations.length === 0 &&
                                <h1 className = 'empty-text'>
                                    Notifications all clear!
                                 </h1>
           }
       </div>
    )
}


export default HeartNotifications
