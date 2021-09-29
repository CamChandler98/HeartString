import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import UserConnections from "./UserConnections"
import './SideBar.css'
import Messages from "./Messages"
import MessageForm from "./MessageForm"


const SideBar = () => {
    const [partner, setPartner] = useState()
    const sessionUser = useSelector(state => state.session.user)

    useEffect(()=> {

    }, [sessionUser])
    useEffect(() => {
        console.log('switching partners!', partner)
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
                <Messages partner = {partner} />
                <MessageForm partner = {partner} />
            </div>
        </div>
    )
}

export default SideBar
