import { REMOVE_USER } from "./session"

const GET = 'messages/GET'
const GET_CON = 'messages/GET_CONVERSATION'
const SEND = 'messages/SEND'
const DELETE = 'messages/DELETE'

const getMessages = (messages) => ({
    type: GET,
    messages
})

const getConversation = (messages) => ({
    type: GET_CON,
    messages
})

const sendMessage = (message) =>({
    type: SEND,
    message
})

const deleteMessage = (message_id) => ({
    type: DELETE,
    message_id
})


export const goGetMessages = (user_id) => async (dispatch) => {
    let res = await fetch(`/api/messages/user/${user_id}`)


    if(res.ok){
        let data = await res.json()
        dispatch(getMessages(data))
    }

}

export const goGetConversation = (user_one_id, user_two_id) => async (dispatch) => {
    let res = await fetch(`/api/messages/convo`,{
        method :'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            user_one_id,
            user_two_id
        })
    })

    if(res.ok){
        let data = await res.json()

        dispatch(getConversation(data))
    }
}

export const goSendMessage = (content,user_id,receiver_id) => async (dispatch) => {
    let res = await fetch(`/api/messages/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            content,
            user_id,
            receiver_id
        })

    })

    if(res.ok){
        let data = await res.json()
        dispatch(sendMessage(data['message']))
        return ['okay', data.notification]
    }else if (res.status < 500){
        const data = await res.json()
        if(data.errors){
            return data.errors
        }
    }else{
        return ['An error occurred. Please try again']
    }
}

export const goDeleteMessage = (message_id) => async (dispatch) =>  {
    const res = await fetch(`/api/messages/${message_id}`,{
        method: 'DELETE'
    })

    if(res.ok){
        const data = await res.json()

        dispatch(deleteMessage(data.deleted))
    }
}

const initialState = {all: {}, conversation: {}}


const messageReducer = (state = initialState, action ) => {
    switch(action.type){
        case GET:
            return{...state, all:{...action.messages}}
        case GET_CON:
            return {...state,
                all:{ ...action.messages},

                conversation: {...action.messages}
        }
        case SEND:
            return {
                ...state,
                all:{...state.all, [action.message.id]: {...action.message}},
                conversation:{...state.conversation, [action.message.id]: {...action.message}}
            }
        case DELETE:
            let deleteState = {...state,
                all: {...state.all},
                conversation: {...state.conversation}
            }

            if(deleteState.all[action.message_id]){
                delete deleteState.all[action.message_id]
            }

            if(deleteState.conversation[action.message_id]){
                delete deleteState.conversation[action.message_id]
            }
            return {...deleteState}
        case REMOVE_USER:
            return {...initialState}
        default:
            return {...state}
    }
}

export default messageReducer
