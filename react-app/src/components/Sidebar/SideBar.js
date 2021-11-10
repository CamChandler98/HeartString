import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Notifications from "./Notifications"
import './SideBar.css'
import Messages from "./Messages"
import MessageForm from "./MessageForm"
import { useSocket } from "../../context/Socket"
import notificationIcon from '../graphics/notification-nav-icon.svg'
import notificationIconNotify from '../graphics/notification-nav-icon-notify.svg'
import connectionIcon from '../graphics/connection-icon.svg'
import connectionIconNotify from '../graphics/connection-icon-notify.svg'

const SideBar = () => {
    const [partner, setPartner] = useState()
    const [heartNotifcations, setHeartNotifications] = useState(false)
    const [messageNotifications, setMessageNotifications] = useState(false)
    const [isFocusConnection , setFocusConnections] = useState(true)
    const sessionUser = useSelector(state => state.session.user)
    const {socketio} = useSocket()

    const heartNotificationState = useSelector (state => state.notifications.hearts)
    const messageNotificationState = useSelector (state => state.notifications.messages)


    useEffect(()=> {
        if(sessionUser){
        socketio.on('hi' , async () => {
            console.log(`YOU'LL NEVER DEFEAT ME COWARD`)
        })}
    }, [sessionUser])

    useEffect(() => {
        if(heartNotificationState){
            let count = Object.keys(heartNotificationState).length
            if(count > 0 ){
                setHeartNotifications(true)
            }else{
                setHeartNotifications(false)
            }
        }
        if(messageNotificationState){
            let count = Object.keys(messageNotificationState).length
            if(count > 0) {
                setMessageNotifications(true)
            }else{
                setMessageNotifications(false)
            }
        }
    }, [messageNotificationState, heartNotificationState])


    useEffect(() => {
        return () => {
            setPartner()
        }
    }, [sessionUser])


    return(
        <div className = 'side-bar'>
           <div className = 'session-connections'>
             {sessionUser &&
                <>
                <div className = 'sidebar-icons'>
                <span onClick = { () => setFocusConnections(false)}>
                    <img src = {heartNotifcations ? notificationIconNotify : notificationIcon} />
                </span>
                <span onClick = { () => setFocusConnections(true)} >
                   <img src = {messageNotifications ? connectionIconNotify : connectionIcon} />
                </span>
                </div>
                {isFocusConnection ? <h2>Connections</h2> : <h2>Notifications</h2>}
                <Notifications partner = {partner} setPartner = {setPartner} isFocusConnection = {isFocusConnection} />
                </>
            }
            {!sessionUser &&
                <p className=' connection-auth-reminder'>
                    Signup or login to start making connections!!
                </p>
            }
            </div>
           {sessionUser && <div className = 'message-container'>
                {partner && <>
                <div className = 'messages-partner-header'>
                    <img className = 'connected-profile-picture' src = {partner.profile_picture_url} />
                    <h2>{partner.display_name}</h2>
                </div>
                <Messages partner = {partner} setPartner = {setPartner} />
                <MessageForm partner = {partner} />
                </>
                }
                {!partner && sessionUser &&
                <p className=' connection-auth-reminder'>
                    Click on a connection to send them a message! Don't have any? Try sending a heart out there, I'm sure you'll make a friend.
                </p>
                }

            </div> }
        </div>
    )
}

export default SideBar
