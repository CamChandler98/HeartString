import { useEffect, useState } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { getConnections } from "../../store/connections"
import NotificationCount from "./NotificationCount"
import { getMessageNotifications, goSeeMessageNotification } from "../../store/notification"
import { useSocket } from "../../context/Socket"


const UserConnections = ({setPartner , partner}) => {
    const [connections, setConnections] = useState([])
    const [notifications, setNotifications] = useState([])
    const[activeConnection, setActiveConnection] = useState(null)
    const {socketio} = useSocket()

    const dispatch = useDispatch()

    const sessionUser = useSelector (state => state.session.user)



    // useEffect(() => {
    //     dispatch(getMessageNotifications(sessionUser.id))
    // },[sessionUser])

    // let notificationsState = useSelector( state => state.notifications.messages)



    useEffect(() => {
        if(sessionUser){
            dispatch(getConnections(sessionUser.id))
        }
    }, [dispatch, sessionUser])

    // useEffect(() => {
    //     if(sessionUser){
    //         socketio.on(`notification_to_${sessionUser.id}`, async () => {
    //             dispatch(getMessageNotifications(sessionUser.id))
    //         })
    //     }
    // }, [sessionUser])
    // const clearNotification = (connection_id) => {
    //     for(let noti in notificationsState){
    //         let currentNotification = notificationsState[noti]

    //         if(+currentNotification.sender_id === +connection_id){

    //             dispatch(goSeeMessageNotification(currentNotification.id))
    //         }
    //     }
    // }

    let connectionState = useSelector (state => state.connections)

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
        // setActiveConnection(connection)
    }


    useEffect(() => {

        return() => {
            setPartner()
            setConnections([])
            connectionState = {}
        }
    }, [sessionUser])
    return (
        <>

            {sessionUser && connections  &&
                connections.map(connection => {
                    return(
                        <div
                        onClick = {() => {
                            setPartner(connection)
                            // clearNotification(connection.id)
                        }}
                        key = {connection.id}>
                            <div className = 'connected-header bar-connection'>
                                <div className = 'connected-top'>
                            <img className ='connected-profile-picture' src = {connection.profile_picture_url} alt ={`connection ${connection.username} profile picture`}/>
                            <p>{connection.display_name}</p>
                           {/* { partner && <NotificationCount notifications = {notificationsState}  partner ={partner} user = {sessionUser} connection_id ={connection.id} /> } */}
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
