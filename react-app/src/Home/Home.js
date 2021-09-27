import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CreateHeartForm from "../components/Hearts/CreateHeartForm"
import HeartsPage from "../components/Hearts/HeartsPage"
import { goGetPopularHearts, goGetRecentHearts } from "../store/hearts"
import './Home.css'
import HomeCreateHeartFormStyle from "./HomeCreateHeartStyle"
// import './HomeCreateHeart.css'
const Home = () => {

    const [focus, setFocus] = useState('recent')
    const [popularHearts, setPopularHearts] = useState([])
    const [recentHearts, setRecentHearts] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(goGetPopularHearts())
        dispatch(goGetRecentHearts())
    },[])

    const popularHeartsState = useSelector(state => state.hearts.popular)
    const recentHeartsState = useSelector(state => state.hearts.recent)


    useEffect(() => {
        if (recentHeartsState){
            let recentArr = [...Object.values(recentHeartsState).sort((a,b) => {
                console.log('subtracting dates', a.created_at - b.created_at)

                return Date.parse(b.created_at) - Date.parse(a.created_at)

            })]

            console.log('here are the most recent hearts' , recentArr)
            setRecentHearts([...recentArr])
        }
    }, [recentHeartsState])


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

    return (
        <div className= 'home-container'>
        <div className ='home-header' >
            <span>Home</span>
        </div>
        <HomeCreateHeartFormStyle>
        <div className = 'create-heart-form-container'>
        <CreateHeartForm />
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
            {focus === 'popular' && <HeartsPage hearts = {popularHeartsState} />}
        </div>
        </div>
    )

}


export default Home
