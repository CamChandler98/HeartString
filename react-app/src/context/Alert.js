import { createContext, useState, useContext } from "react";

export const AlertContext = createContext()

export const useAlert = () => useContext(AlertContext)

export default function AlertProvider(props) {

    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setAlertText] = useState('')

    return (
        <AlertContext.Provider
            value = {{setShowAlert , setAlertText}}
            >
                {props.children}
            </AlertContext.Provider>
    )
}
