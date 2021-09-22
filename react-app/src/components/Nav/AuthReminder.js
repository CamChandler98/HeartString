import LoginFormModal from "../auth/LoginFormModal"
import SignUpFormModal from "../auth/SignupFormModal"
// import './AuthReminder.css'
import AuthReminderStyle from "./AuthReminderStyle"
const AuthReminder = () => {

    return (
        <AuthReminderStyle>
        <div className = 'auth-reminder'>
        <div className = 'reminder-text'>
        <h2>
            Let your heart be your guiding key.
        </h2>
        <span>Join HeartString</span>
        </div>
        <div className = 'auth-buttons'>
        <LoginFormModal />
        <SignUpFormModal />
        </div>
        </div>
        </AuthReminderStyle>
    )
}

export default AuthReminder
