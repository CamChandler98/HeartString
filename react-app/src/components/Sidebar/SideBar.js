import { useEffect } from "react"
import { useSelector } from "react-redux"
import UserConnections from "./UserConnections"



const SideBar = () => {
    const sessionUser = useSelector(state => state.session.user)

    useEffect(()=> {

    }, [sessionUser])

    return(
        <div className = 'side-bar'>
            {sessionUser && <UserConnections />}
        </div>
    )
}

export default SideBar
