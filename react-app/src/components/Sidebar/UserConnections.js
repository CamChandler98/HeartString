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
                        <>
                        {connection.username}
                        </>
                    )
                })
            }
        </div>
    )
}

export default UserConnections
