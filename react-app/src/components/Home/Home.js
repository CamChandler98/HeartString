import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CreateHeartForm from "../Hearts/CreateHeartForm"
import HeartsPage from "../Hearts/HeartsPage"
import { goGetPopularHearts, goGetRecentHearts } from "../../store/hearts"
import './Home.css'
import HomeCreateHeartFormStyle from "./HomeCreateHeartStyle"
import HomeCreateHeartForm from "./HomeCreateHeartForm"

// import './HomeCreateHeart.css'
const Home = () => {

    const [focus, setFocus] = useState('recent')
    const [popularHearts, setPopularHearts] = useState([])
    const [recentHearts, setRecentHearts] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(goGetPopularHearts())
        dispatch(goGetRecentHearts())
    },[dispatch])

    const popularHeartsState = useSelector(state => state.hearts.popular)
    const recentHeartsState = useSelector(state => state.hearts.recent)


    useEffect(() => {
        if (recentHeartsState){
            let recentArr = [...Object.values(recentHeartsState).sort((a,b) => {

                return Date.parse(b.created_at) - Date.parse(a.created_at)

            })]

            setRecentHearts([...recentArr])
        }

        if(popularHeartsState){
            setPopularHearts([...Object.values(popularHeartsState)])
        }
    }, [recentHeartsState, popularHeartsState])


    const switchFocus = (e,target) => {
        if(focus === target) return
        console.log('switching focus to ', target)
        let barItems = document.querySelectorAll('.bar-item')
        for( let item of barItems){
            item.classList.remove('focused')
        }
        e.currentTarget.classList.add('focused')

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

    return (
        <div className= 'home-container'>
        <div className ='home-header' >
            <span>Home</span>
        </div>
        <HomeCreateHeartFormStyle>
        <div className = 'create-heart-form-container'>
        <HomeCreateHeartForm />
        </div>
        </HomeCreateHeartFormStyle>
        <div className = 'tab-bar'>
            <div className ='bar-item focused yellow'
            onClick = {(e)=> switchFocus(e,'recent')}>
            <span>recent</span>
            </div>
            <div className ='bar-item blue '
            onClick = {(e)=> switchFocus(e,'popular')}>
            <span>popular</span>
            </div>
        </div>
        <div className = 'focus-content'>
            {focus === 'recent' && <HeartsPage hearts = {recentHearts} />}
            {focus === 'popular' && <HeartsPage hearts = {popularHearts} />}
        </div>
        </div>
    )

}


export default Home
