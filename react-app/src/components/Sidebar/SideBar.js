import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Notifications from "./Notifications"
import './SideBar.css'
import Messages from "./Messages"
import MessageForm from "./MessageForm"
import { useSocket } from "../../context/Socket"
import notificationIcon from '../graphics/notification-nav-icon.svg'
import connectionIcon from '../graphics/connection-icon.svg'
const SideBar = () => {
    const [partner, setPartner] = useState()
    const [isFocusConnection , setFocusConnections] = useState(true)
    const sessionUser = useSelector(state => state.session.user)
    const {socketio} = useSocket()

    useEffect(()=> {
        socketio.on('hi' , async () => {
            console.log(`YOU'LL NEVER DEFEAT ME COWARD`)
        })
    }, [sessionUser])
    useEffect(() => {
    }, [partner])
    return(
        <div className = 'side-bar'>
           <div className = 'session-connections'>
             {sessionUser &&
                <>
                <div className = 'sidebar-icons'>
                <span>
                    <img src = {notificationIcon} />
                </span>
                <span>
                   <img src = {connectionIcon} />
                </span>
                </div>
                {isFocusConnection ? <h2>Connections</h2> : <h2>Notifications</h2>}
                <Notifications partner = {partner} setPartner = {setPartner} />
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
