const GET_MESSAGE = 'notifications/GET_MESSAGE'
const SEE = 'notifications/SEE'


const getMessage = (notifications) => ({
    type: GET_MESSAGE,
    notifications
})


const seeNotification = (notification_id) => ({
    type: SEE,
    notification_id
})
export const getMessageNotifications = (user_id) => async (dispatch) => {

    let res = await fetch(`/api/message/user/${user_id}`)

    if (res.ok){
        let data = await res.json()
        dispatch(getMessage(data))
    }

}

export 

const initialState = {messages: {}, hearts:{}}

export default function notificationReducer(state = initialState, action) {

    switch(action.type){
        case GET_MESSAGE:
            return {
                ...state,
                messages: {...action.notifications}
            }
        default:
            return {...state}
    }
}
