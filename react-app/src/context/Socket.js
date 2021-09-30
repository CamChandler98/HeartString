import { createContext, useContext } from "react";
import { io } from 'socket.io-client';

let endPoint = 'https://localhost:5000';

let socketio = io.connect(`${endPoint}`);



export const SocketContext = createContext()
export const useSocket = () => useContext(SocketContext)
export default function SocketProvider(props) {
    return(
    <SocketContext.Provider
    value = {{socketio}}>
        {props.children}
    </SocketContext.Provider>)
}