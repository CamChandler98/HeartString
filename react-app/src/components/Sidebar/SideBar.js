import { useEffect } from "react"
import { useSelector } from "react-redux"
import UserConnections from "./UserConnections"
import './SideBar.css'


const SideBar = () => {
    const sessionUser = useSelector(state => state.session.user)

    useEffect(()=> {

    }, [sessionUser])

    return(
        <div className = 'side-bar'>
           {<div className = 'session-connections'>
             {sessionUser &&
                <>
                <h2>Your Connections</h2>
                <UserConnections />
                </>
            }
            {!sessionUser &&
                <p className=' connection-auth-reminder'>
                    Signup or login to start making connections!!
                </p>
            }
            </div> }
        </div>
    )
}

export default SideBar
