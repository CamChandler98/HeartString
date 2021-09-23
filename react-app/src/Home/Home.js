import CreateHeartForm from "../components/Hearts/CreateHeartForm"
import './Home.css'
import './HomeCreateHeart.css'
const Home = () => {

    return (
        <div className= 'home-container'>
        <div className ='home-header' >
            <span>Home</span>
        </div>
        <div className = 'create-heart-form-container'>
        <CreateHeartForm />
        </div>
        </div>
    )
}


export default Home
