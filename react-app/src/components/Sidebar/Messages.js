import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { goGetConversation } from "../../store/messages"
import Message from "./Message"


const Messages = ({partner}) => {

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

    useEffect(() => {
        console.log('setting those messages from the store' , messagesState)
        setMessages([...Object.values(messagesState)])
    }, [messagesState])


    return (
        <div>
            <div>
            {messages && messages.map( message => {
                console.log(`this is what i'm looking at`, messages)
                console.log('got those messages lemme organize them a bit', message)

                return (<Message content = {message.content} user_pic = {message.sender_pic} key = {message.id} />)
            })}
            </div>
        </div>
    )

}


export default Messages
