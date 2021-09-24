import { useEffect } from "react"
import { useAlert } from "../../context/Alert"
import './Alert.css'


const Alert = () => {
    const {showAlert,setShowAlert, alertText} = useAlert()

    // useEffect(() => {
    //     setTimeout(() => {
    //         setShowAlert(false)
    //     },100000)
    // },[])

    return(
        <div className = 'alert'>
            {alertText}
        </div>
    )
}

export default Alert
