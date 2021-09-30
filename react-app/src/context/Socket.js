import { createContext, useContext } from "react";
import { io } from 'socket.io-client';

// http://127.0.0.1:5000/


let endPoint = 'http://localhost:5000';

let socketio = io()



export const SocketContext = createContext()
export const useSocket = () => useContext(SocketContext)
export default function SocketProvider(props) {
    return(
    <SocketContext.Provider
    value = {{socketio}}>
        {props.children}
    </SocketContext.Provider>)
}
