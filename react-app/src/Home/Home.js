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

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(goGetPopularHearts())
        dispatch(goGetRecentHearts())
    },[])

    const popularHearts = useSelector(state => state.hearts.popular)
    const recentHearts = useSelector(state => state.hearts.recent)

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
            {focus === 'popular' && <HeartsPage hearts = {popularHearts} />}
        </div>
        </div>
    )

}


export default Home
