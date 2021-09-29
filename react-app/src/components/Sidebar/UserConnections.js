import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getConnections } from "../../store/connections"


const UserConnections = () => {
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

    return (
        <div>
            {sessionUser && connections &&
                connections.map(connection => {
                    return(
                        <div key = {connection.id}>
                            <div className = 'connected-header'>
                                <div className = 'connected-top'>
                            <img className ='connected-profile-picture' src = {connection.profile_picture_url} alt ={`connection ${connection.username} profile picture`}/>
                            <p>{connection.display_name}</p>
                            </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserConnections
