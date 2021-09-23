import CreateHeartForm from "../components/Hearts/CreateHeartForm"
import './Home.css'
import HomeCreateHeartFormStyle from "./HomeCreateHeartStyle"
// import './HomeCreateHeart.css'
const Home = () => {

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
        <div className = 'hearts-page'></div>
        </div>
    )
}


export default Home
