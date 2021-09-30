import { createContext, useContext } from "react";
import { io } from 'socket.io-client';

let endPoint


if(process.env.NODE_ENV !== 'production'){
    endPoint = 'http://localhost:5000';
}else{
    endPoint =   'http://localhost:58620';
}
let socketio = io(endPoint)



export const SocketContext = createContext()
export const useSocket = () => useContext(SocketContext)
export default function SocketProvider(props) {
    return(
    <SocketContext.Provider
    value = {{socketio}}>
        {props.children}
    </SocketContext.Provider>)
}
