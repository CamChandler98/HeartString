import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSocket } from "../../context/Socket"
import { goGetConversation } from "../../store/messages"
import Message from "./Message"


const Messages = ({partner, setPartner}) => {
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

    const messagesState = useSelector( state => state.messages.conversation)

    useEffect(async () => {
        if(user && partner){
            socketio.off()
            console.log('loooking for messages to', user.id , 'from' , partner.id)
        socketio.on(`message_to_${user.id}_from_${partner.id}`, async () => {

            console.log('looks like a message from', user.id, 'to,' , partner.id)
            await dispatch(goGetConversation(user.id, partner.id))
        })}

        return  async () => {
            console.log('looks like this' , socketio)
        }
    },[user,partner])

    useEffect(() => {

        setMessages([...Object.values(messagesState)])
    }, [messagesState, partner])


    return (
        <>

            {messages && messages.map( (message, i) => {


                return (<Message message_user_id = {message.sender_id}content = {message.content} user_pic = {message.sender_pic} key = {message.id} user_id = {user?.id} />)
            })}

        </>
    )

}


export default Messages
