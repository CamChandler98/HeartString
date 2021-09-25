import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { goGetSessionHearts, goGetUserHearts } from "../../store/hearts"
import { getUser } from "../../store/profile"
import HeartsPage from "../Hearts/HeartsPage"


const Profile = () => {
    const [focus, setFocus] = useState('recent')
    const [owner,setOwner] = useState(false)
    const [hearts, setHearts] = useState([])
    const {username} = useParams()
    const dispatch = useDispatch()

    let profileUser = useSelector(state => state.profile)
    let sessionUser = useSelector(state => state.session.user)

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
        else if(sessionUser.id && profileUser.id ){
            dispatch(goGetUserHearts(profileUser.id))
            setOwner(false)
        }

        return () => {
            setOwner(false)
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
            case 'popular':
                setFocus('popular')
                break;
            case 'recent':
                setFocus('recent')
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
            setHearts(Object.values(sessionHearts).reverse())
            console.log('got your hearts!')
        }else if(profileHearts){
            setHearts(Object.values(profileHearts).reverse())
            console.log('got anothers hearts!')
        }
        return () =>{

            setHearts([])
        }


    },[sessionHearts,profileHearts,profileUser,sessionUser])

    return (
        <div className= 'home-container'>
        <div className ='home-header' >
            <span>{profileUser.display_name}</span>
        </div>
        <div className = 'tab-bar'>
            <div className ='bar-item focused yellow'
            onClick = {(e)=> switchFocus(e,'recent')}>
            <span>recent</span>
            </div>
            {/* <div className ='bar-item blue '
            onClick = {(e)=> switchFocus(e,'popular')}>
            <span>popular</span>
            </div> */}
        </div>
        <div className = 'focus-content'>
            {hearts && focus === 'recent' && <HeartsPage hearts = {hearts} />}
            {/* {focus === 'popular' && <HeartsPage hearts = {popularHearts} />} */}
        </div>
        </div>
    )
}

export default Profile
