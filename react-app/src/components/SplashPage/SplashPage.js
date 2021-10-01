import { useSelector } from "react-redux"
import { Redirect } from "react-router"
import DemoModal from "../auth/DemoModal"
import LoginFormModal from "../auth/LoginFormModal"
import SignUpFormModal from "../auth/SignupFormModal"
import './SplashPage.css'

const SplashPage = () => {

    const sessionUser = useSelector(state => state.session.user);

    if(sessionUser){
        return(
            <Redirect to ={`/home`}/>
        )
    }

    return (
        <div className = 'splash-container'>
            <div className = 'intro-text'>
                <h1>
                    HeartString
                </h1>
                <h2>
                   Put your heart out there and make a connection
                </h2>
                <p className = 'intro-copy'>
                    HeartString is a different kind of social media. Post anonymous Hearts and see which replies move you!. From the replies on your Hearts you can choose one person to connect with! Once connected you can see each others Hearts
                </p>
            </div>
            <div className = 'auth-links'>
                <LoginFormModal />
                <SignUpFormModal />
                <DemoModal />
            </div>
       </div>
    )
}


export default SplashPage
