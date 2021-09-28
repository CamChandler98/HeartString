import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router"
import { goGetSessionHearts, goGetUserHearts } from "../../store/hearts"
import { getUser } from "../../store/profile"
import HeartsPage from "../Hearts/HeartsPage"
import DeleteProfileModal from "./DeleteProfileModal"
import ManageProfileModal from "./ManageProfileModal"
import './ProfilePage.css'

const Profile = () => {
    const [focus, setFocus] = useState('open')
    const [owner,setOwner] = useState(false)
    const [hearts, setHearts] = useState([])
    const[openHearts, setOpenHearts] = useState([])
    const [closedHearts, setClosedHearts] = useState([])
    const [connections, setConnections] = useState([])


    const {username} = useParams()
    const dispatch = useDispatch()

    let profileUser = useSelector(state => state.profile)
    let sessionUser = useSelector(state => state.session.user)
    let userCo
    useEffect(() => {
        if(username !== undefined){
        dispatch(getUser(username))
        }
    },[username])


    useEffect(() => {
        if(sessionUser && profileUser && profileUser.id === sessionUser.id){
            dispatch(goGetSessionHearts(sessionUser?.id))
            setOwner(true)
        }
        else if(profileUser.id ){
            dispatch(goGetUserHearts(profileUser.id))
            setOwner(false)
        }else{

        }
        return () => {
            setOwner(false)
            setHearts([])
        }
    }, [profileUser,sessionUser])

    const switchFocus = (e,target) => {
        if(focus === target) return
        console.log('switching focus to ', target)
        let barItems = document.querySelectorAll('.bar-item')
        for( let item of barItems){
            item.classList.remove('focused')
        }
        e.target.classList.add('focused')

        switch(target){
            case 'open':
                setFocus('open')
                break;
            case 'closed':
                setFocus('closed')
                break;
            default:
                break;
        }
    }


    let sessionHearts = useSelector(state => state?.hearts?.session_user)
    let profileHearts = useSelector(state => state?.hearts?.profile )


    useEffect(() => {
        console.log('going to get those hearts for you')
        console.log(sessionHearts)
        if(sessionHearts && owner){
            let userHearts = Object.values(sessionHearts).reverse()
            setHearts([...userHearts])
            setOpenHearts([...userHearts.filter(heart => heart.open === true)])
            setClosedHearts1([...userHearts.filter(heart => heart.open !== true)])
            console.log('got your hearts!')
        }else if(profileHearts){
            let userHearts = Object.values(profileHearts).reverse()
            setHearts([...userHearts])
            setOpenHearts([...userHearts.filter(heart => heart.open === true)])
            setClosedHearts([...userHearts.filter(heart => heart.open !== true)])
        }
        return () =>{

            setHearts([])
            setOpenHearts([])
            setClosedHearts([])
        }


    },[sessionHearts,profileHearts,profileUser,sessionUser])


    if(!sessionUser){
        return(
            <Redirect to ={`/home`}/>
        )
    }

    return (
        <div className= 'home-container'>
        <div className ='home-header' >
            <span>{owner ? sessionUser.username: profileUser.username}</span>
        </div>
        <div className = 'user-info-header' >
            <img className = 'profile-picture' src = {owner ? sessionUser.profile_picture_url : profileUser.profile_picture_url} />
            <div className = 'profile-header-text'>
                <span id = 'display-name'>{owner ?sessionUser.display_name :profileUser.display_name}</span>
                <span id = 'username'>@{profileUser.username}</span>
                <div className = 'manage-profile-buttons'>
                {owner && <ManageProfileModal user ={sessionUser} />}
                {owner && <DeleteProfileModal user = {sessionUser}/>}
                </div>
            </div>
        </div>
        <div className = 'tab-bar'>
            <div className ='bar-item focused yellow'
            onClick = {(e)=> switchFocus(e,'open')}>
            <span>open hearts</span>
            </div>
            <div className ='bar-item yellow'
            onClick = {(e)=> switchFocus(e,'closed')}>
            <span>closed hearts</span>
            </div>
        </div>
        <div className = 'focus-content'>
            {hearts && focus === 'open' && <HeartsPage hearts = {openHearts} />}
            {hearts && focus === 'closed' && <HeartsPage hearts = {closedHearts} />}
        </div>
        </div>
    )
}

export default Profile
