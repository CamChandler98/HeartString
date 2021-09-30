import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getConnections } from "../../store/connections"
import NotificationCount from "./NotificationCount"


const UserConnections = ({setPartner}) => {
    const [connections, setConnections] = useState([])
    const dispatch = useDispatch()

    const sessionUser = useSelector (state => state.session.user)


    useEffect(() => {
        if(sessionUser){
            dispatch(getConnections(sessionUser.id))
        }
    }, [dispatch, sessionUser])

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

            {sessionUser && connections &&
                connections.map(connection => {
                    return(
                        <div
                        onClick = {() => handlePartner(connection)}
                        key = {connection.id}>
                            <div className = 'connected-header bar-connection'>
                                <div className = 'connected-top'>
                            <img className ='connected-profile-picture' src = {connection.profile_picture_url} alt ={`connection ${connection.username} profile picture`}/>
                            <p>{connection.display_name}</p>
                            </div>
                            <NotificationCount user_id = {sessionUser.id} connection_id ={connection.id} />
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default UserConnections
