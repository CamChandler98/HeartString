import { useEffect, useState,  } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import EditHeartModal from './EditHeartFormModal'
import './Heart.css'
import DeleteModal from '../util/DeleteModal';
import EditMarker from '../util/EditMarker';
import { goCloseHeart } from '../../store/hearts';

const Heart = ({heart}) => {

    let dispatch = useDispatch()

    let history = useHistory()

    const [expirationCountdown, setExpirationCountdown] = useState(heart.expires - Math.floor((new Date().getTime()/1000)))

    const [owner, setOwner] = useState(false)
    const[connected, setConnected] = useState(false)
    let sessionUser = useSelector(state => state.session.user)
    let sessionUserConnections = useSelector(state => state.connections)


        const updateCountdown = () => {
            let currentTime = Math.floor((new Date().getTime()/1000))
            let expiresInSec = heart.expires - currentTime
            setExpirationCountdown(expiresInSec)
        }

        const redirectToHeartPage = (e) => {

            history.push(`/hearts/${heart.id}`)
        }

    useEffect(() => {
        if(sessionUser && sessionUser.id === heart.user_id){
            setOwner(true)
        }else{
            setOwner(false)
        }
    },[sessionUser])


    useEffect(() => {
        const interval = setInterval(() => {

            updateCountdown()
        },1000)

        if(expirationCountdown <= 0){

            dispatch(goCloseHeart(heart.id))
            clearInterval(interval)
        }
        return () => {
            clearInterval(interval)
        }
    },[expirationCountdown, updateCountdown])

    useEffect(() => {
        if(sessionUserConnections && sessionUserConnections[heart.user_id]){

            setConnected(true)
        }else if (sessionUserConnections && !sessionUserConnections[heart.user_id]){

            setConnected(false)
        }

        return () => {
            setConnected(false)
        }
    }, [sessionUserConnections])



    return(
        <div className = 'heart-container' onClick = {redirectToHeartPage}>
            {(connected || owner) &&
              <div className = 'connected-header'>
                <div className = 'connected-top'>
               <img className ='connected-profile-picture' src = {heart.user_profile_pic} alt ={`connection ${heart.username} profile picture`}/>
               <p>{heart.display_name}</p>
               </div>
               <span>@{heart.username}</span>
               </div>}
                <p className = 'heart-text'>{heart.content}</p>
                    <h3>Expires in :</h3>
                { expirationCountdown && !Number.isNaN(expirationCountdown) &&
                    <p className = 'expiration-count'>
                {expirationCountdown > 0 ? expirationCountdown: 'EXPIRED'}
                </p>}

                {owner &&
                <div className = 'crud-buttons'>
                    <div className = 'edit-heart'>
                    <EditHeartModal content = {heart.content} heart_id = {heart.id} content_url = {heart.content_url} time_to_live = {heart.time_to_live} />
                    </div>
                    <div className = 'delete-heart'>
                        <DeleteModal id = {heart.id} type = {'heart'} onClick= {e => e.stopPropagation()} />
                    </div>

                </div>
                }
                    <EditMarker obj = {heart} />
        </div>
    )
}

export default Heart
