import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import UserConnections from "./UserConnections"
import './SideBar.css'
import Messages from "./Messages"
import MessageForm from "./MessageForm"
import { useSocket } from "../../context/Socket"


const SideBar = () => {
    const [partner, setPartner] = useState()
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
                <h2>Your Connections</h2>
                <UserConnections setPartner = {setPartner} />
                </>
            }
            {!sessionUser &&
                <p className=' connection-auth-reminder'>
                    Signup or login to start making connections!!
                </p>
            }
            </div>
            <div className = 'message-container'>
                {partner && sessionUser &&<>
                <h2>{partner.display_name}</h2>
                <Messages partner = {partner} />
                <MessageForm partner = {partner} />
                </>
                }
            </div>
        </div>
    )
}

export default SideBar
