import { useEffect } from "react"
import { useDispatch } from "react-redux"
import CreateHeartForm from "../components/Hearts/CreateHeartForm"
import HeartPage from "../components/Hearts/HeartPage"
import { goGetPopularHearts } from "../store/hearts"
import './Home.css'
import HomeCreateHeartFormStyle from "./HomeCreateHeartStyle"
// import './HomeCreateHeart.css'
const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(goGetPopularHearts)
    },[])
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
        <div>
            <HeartPage />
        </div>
        </div>
    )

}


export default Home
