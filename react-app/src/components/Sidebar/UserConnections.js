import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getConnections } from "../../store/connections"
import NotificationCount from "./NotificationCount"
import { getMessageNotifications, goSeeMessageNotification } from "../../store/notification"


const UserConnections = ({setPartner}) => {
    const [connections, setConnections] = useState([])
    const [notifications, setNotifications] = useState([])



    const dispatch = useDispatch()

    const sessionUser = useSelector (state => state.session.user)



    useEffect(() => {
        dispatch(getMessageNotifications(sessionUser.id))
    },[sessionUser])

    let notificationsState = useSelector( state => state.notifications.messages)



    useEffect(() => {
        if(sessionUser){
            dispatch(getConnections(sessionUser.id))
        }
    }, [dispatch, sessionUser])


    const clearNotification = (connection_id) => {
        for(let noti in notificationsState){
            let currentNotification = notificationsState[noti]

            if(+currentNotification.sender_id === +connection_id){

                dispatch(goSeeMessageNotification(currentNotification.id))
            }
        }
    }

    const connectionState = useSelector (state => state.connections)

    useEffect(() => {
        if(connectionState){
            setConnections(Object.values(connectionState))
        }
        return () => {
            setConnections([])
        }
    },[connectionState, sessionUser])

    const handlePartner = (connection) => {
        setPartner(connection)
    }

    return (
        <>

            {sessionUser && connections && notificationsState &&
                connections.map(connection => {
                    return(
                        <div
                        onClick = {() => {
                            handlePartner(connection)
                            clearNotification(connection.id)
                        }}
                        key = {connection.id}>
                            <div className = 'connected-header bar-connection'>
                                <div className = 'connected-top'>
                            <img className ='connected-profile-picture' src = {connection.profile_picture_url} alt ={`connection ${connection.username} profile picture`}/>
                            <p>{connection.display_name}</p>
                            <NotificationCount notifications = {notificationsState} connection_id ={connection.id} />
                            </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default UserConnections
