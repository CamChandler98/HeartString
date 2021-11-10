import { REMOVE_USER } from "./session"

const GET_MESSAGE = 'notifications/GET_MESSAGE'

const GET_HEART = 'notifications/GET_HEART'

const SEE_MESSAGE = 'notifications/SEE_MESSAGE'

const SEE_HEART = 'notifications/SEE_HEART'

const getMessage = (notifications) => ({
    type: GET_MESSAGE,
    notifications
})

const getHeart = (notifications) => ({
    type: GET_HEART,
    notifications
})


const seeMessageNotification = (notification_id) => ({
    type: SEE_MESSAGE,
    notification_id
})

const seeHeartNotification = (notification_id) => ({
    type: SEE_HEART,
    notification_id
})
export const getMessageNotifications = (user_id) => async (dispatch) => {

    let res = await fetch(`/api/notifications/message/user/${user_id}`)

    if (res.ok){
        let data = await res.json()
        dispatch(getMessage(data))
    }

}

export const getHeartNotifications = (user_id) => async (dispatch) => {
    let res = await fetch(`/api/notifications/reply/user/${user_id}`)

    if(res.ok){
        let data = await res.json()
        console.log(data, 'heres some replies')
        dispatch(getHeart(data))
    }

}

export const goSeeMessageNotification = (notification_id) => async (dispatch) => {
    let res = await fetch(`/api/notifications/message/${notification_id}`, {
        method: 'DELETE'
    })

    if(res.ok){
        const data = await res.json()

        dispatch(seeMessageNotification(data.deleted))
    }
}

export const goSeeHeartNotification = (notification_id) => async (dispatch) => {
    let res = await fetch(`/api/notifications/reply/${notification_id}`, {
        method: 'DELETE'
    })

    if(res.ok){
        const data = await res.json()

        dispatch(seeHeartNotification(data.deleted))
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
        case GET_HEART:
            return {
                ...state,
                hearts: {...action.notifications}
            }
        case SEE_MESSAGE: {
            let deleteState = {...state, messages: {...state.messages},}
            delete deleteState.messages[action.notification_id]
            return {...deleteState}

        }
        case SEE_HEART: {
            let deleteHeartState = {...state, hearts: {...state.hearts},}
            delete deleteHeartState.hearts[action.notification_id]
            return {...deleteHeartState}

        }
        case REMOVE_USER: {
            return {...initialState}
        }
        default:
            return {...state}
    }
}
