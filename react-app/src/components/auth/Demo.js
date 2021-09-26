import { useDispatch } from "react-redux"
import { login } from "../../store/session"
import './Demo.css'

const DemoLogin = () => {
    const dispatch = useDispatch()

    const loginRomeow = () => {
        let credential = 'Romeow'
        let password = 'password'

        dispatch(login(credential, password))
    }

    const loginJulion = () => {
        let credential = 'Julion'
        let password = 'password'

        dispatch(login(credential, password))
    }

    return (
        <div className = 'demo-container'>
                <h1>Demo</h1>
            <div className = 'demo-user-container' >
            <div className = 'romeow'>
                <h2>
                    Romeow
                </h2>
                <img src = 'https://heartstringawsbuckect.s3.amazonaws.com/romeo-profile-pic.svg' />
                <button onClick = {loginRomeow}>
                    Demo
                </button>
            </div>

            <div className = 'julion'>
                <h2>
                    Julion
                </h2>
                <img src = 'https://heartstringawsbuckect.s3.amazonaws.com/julion-profile-pic.svg' />
                <button onClick = {loginJulion}>
                    Demo
                </button>
            </div>

        </div>
        </div>
    )
}

export default DemoLogin
