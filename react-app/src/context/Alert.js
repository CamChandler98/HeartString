import { createContext, useState, useContext } from "react";

export const AlertContext = createContext()

export const useAlert = () => useContext(AlertContext)

export default function AlertProvider(props) {

    const [showAlert, setShowAlert] = useState(true)
    const [alertText, setAlertText] = useState('look at notification')



    return (
        <AlertContext.Provider
            value = {{setShowAlert , setAlertText, alertText, showAlert}}
            >
                {props.children}
            </AlertContext.Provider>
    )
}
