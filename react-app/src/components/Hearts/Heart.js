import { useEffect, useState,  } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux'
import EditHeartModal from './EditHeartFormModal'
import './Heart.css'
import DeleteModal from '../util/DeleteModal';
import EditMarker from '../util/EditMarker';

const Heart = ({heart}) => {

    const [expirationCountdown, setExpirationCountdown] = useState(heart.expires - Math.floor((new Date().getTime()/1000)))

    const [owner, setOwner] = useState(false)
    let history = useHistory()
    let sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        if(sessionUser && sessionUser.id === heart.user_id){
            setOwner(true)
        }else{
            setOwner(false)
        }
    },[sessionUser])

    const updateCountdown = () => {
        let currentTime = Math.floor((new Date().getTime()/1000))
        let expiresInSec = heart.expires - currentTime
        setExpirationCountdown(expiresInSec)
    }

    const redirectToHeartPage = (e) => {
        console.log('i,' ,e.target, 'am redirecting to heart page')
        history.push(`/hearts/${heart.id}`)
    }



    useEffect(() => {
        const interval = setInterval(() => {
            console.log('starting countdown')
            updateCountdown()
        },1000)

        if(expirationCountdown <= 0){
            console.log('it ends today', expirationCountdown)
            clearInterval(interval)
        }
        return () => {
            clearInterval(interval)
        }
    },[expirationCountdown, updateCountdown])



    return(
        <div className = 'heart-container' onClick = {redirectToHeartPage}>
                <p className = 'heart-text'>{heart.content}</p>
                    <h3>Expires in :</h3>
                <p className = 'expiration-count'>
                {expirationCountdown > 0 ? expirationCountdown: 'EXPIRED'}
                </p>

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
