import { REMOVE_USER } from "./session"

const GET_MESSAGE = 'notifications/GET_MESSAGE'

const GET_HEART = 'notifications/GET_HEART'

const SEE = 'notifications/SEE'


const getMessage = (notifications) => ({
    type: GET_MESSAGE,
    notifications
})

const getHeart = (notifications) => ({
    type: GET_HEART,
    notifications
})


const seeNotification = (notification_id) => ({
    type: SEE,
    notification_id
})
export const getMessageNotifications = (user_id) => async (dispatch) => {

    let res = await fetch(`/api/notifications/message/user/${user_id}`)

    if (res.ok){
        let data = await res.json()
        dispatch(getMessage(data))
    }

}

export const getHeartNotifications = (user_id) => (dispatch) => {
    let res = await fetch(`/api/notifications/message/user/${user_id}`)

    if(res.ok){
        let data = await res.json()
        dispatch(getHeart(data))
    }
    
}

export const goSeeMessageNotification = (notification_id) => async (dispatch) => {
    let res = await fetch(`/api/notifications/message/${notification_id}`, {
        method: 'DELETE'
    })

    if(res.ok){
        const data = await res.json()

        dispatch(seeNotification(data.deleted))
    }
}

const initialState = {messages: {}, hearts:{}}

export default function notificationReducer(state = initialState, action) {

    switch(action.type){
        case GET_MESSAGE:
            return {
                ...state,
                messages: {...action.notifications}
            }
        case SEE: {
            let deleteState = {...state, messages: {...state.messages}}
            delete deleteState.messages[action.notification_id]
            return {...deleteState}

        }
        case REMOVE_USER: {
            return {...initialState}
        }
        default:
            return {...state}
    }
}
