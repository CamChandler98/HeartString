import { useEffect } from "react"
import { useAlert } from "../../context/Alert"
import './Alert.css'


const Alert = () => {
    const {showAlert,setShowAlert, alertText} = useAlert()

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(false)
        },3000)
    },[])

    return(
        <div className = 'alert-container'>
            <div className = 'alert'>
            {alertText}
            </div>
        </div>
    )
}

export default Alert
