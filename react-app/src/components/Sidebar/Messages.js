import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSocket } from "../../context/Socket"
import { goGetConversation } from "../../store/messages"
import Message from "./Message"


const Messages = ({partner}) => {
    let {socketio} = useSocket()

    const dispatch = useDispatch()
    const [messages, setMessages] = useState([])
    const user = useSelector(state => state.session.user)

    // useEffect(() => {
    //     setPartner(activeConnection)
    // }, [activeConnection])

    useEffect(() => {
        if(partner && user){

        dispatch(goGetConversation(user.id, partner.id))
    }
    }, [partner,user])

    useEffect(() => {
        socketio.on(`hi` , async () => {
            window.alert('HELLO')
        })
        socketio.on(`message_to_${user.id}_from_${partner.id}`, async () => {
            dispatch(goGetConversation(user.id, partner.id))
        })
    },[user,partner])
    const messagesState = useSelector( state => state.messages.conversation)

    useEffect(() => {

        setMessages([...Object.values(messagesState)])
    }, [messagesState])


    return (
        <div>
            <div>
            {messages && messages.map( message => {


                return (<Message content = {message.content} user_pic = {message.sender_pic} key = {message.id} />)
            })}
            </div>
        </div>
    )

}


export default Messages
