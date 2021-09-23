const GET = 'replies/GET'
const GET_USER = 'replies/GET_USER'
const GET_HEART = 'replies/GET_HEART'
const ADD_REPLY = 'replies/ADD_REPLY'
const DELETE_REPLY = 'replies/DELETE_REPLY'
const getHeartReplies = (replies) => ({
    type: GET_HEART,
    replies
})

const getUserReplies = (replies) => ({
    type: GET_USER,
    replies
})

const addReply = (reply) => ({
    type: ADD_REPLY,
    reply
})

const updateReply = (reply) => ({
    type: ADD_REPLY,
    reply
})
const deleteReply = (reply_id) => ({
    type: DELETE_REPLY,
    reply_id
})


export const goGetUserReplies = (userId) => async (dispatch) => {
    let res = await fetch(`/api/replies/user/${userId}`)

    if(res.ok){
        let data = await res.json()
        dispatch(getUserReplies(data))
    }
}

export const goGetHeartReplies = (heartId) => async (dispatch) => {
    let res = await fetch(`/api/replies/heart/${heartId}`)

    if(res.ok){
        let data = await res.json()
        dispatch(getHeartReplies(data))
    }
}

export const goAddReply = ({content, heart_id, user_id }) => async (dispatch) => {


    const res = await fetch('/api/replies/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body:JSON.stringify({content,heart_id,user_id})
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(addReply(data))
    }else if(res.status < 500){
        const data = await res.json()

        if(data.errors){
            console.log('sending these error to the heart form ->>', data.errors)
            return data.errors
        }
    }else{
        return ['An error occurred. Please try again']
    }
}

export const goUpdateReply = ({reply_id,heart_id,user_id,content}) => async (dispatch) => {

    const res = await fetch('/api/replies/edit',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body : JSON.stringify({
            reply_id,
            heart_id,
            user_id,
            content
        })
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(updateReply(data))
    }else if(res.status < 500){
        const data = await res.json()

        if(data.errors){
            console.log('sending these error to the edit heart form ->>', data.errors)
            return data.errors
        }
    }else{
        return ['An error occurred. Please try again']
    }
}


export const goDeleteReply = (reply_id) => async (dispatch) => {
    const res = await fetch(`/api/reply/${reply_id}`,{
        method: 'DELETE'
    })

    if(res.ok){
        const data = await res.json()

        dispatch(deleteReply(data.deleted))
    }
}

const initialState = {profile:{}, heart: {},session_user:{}}



const replyReducer = (state = initialState, action) =>{
    switch (action.type){

        case GET_USER:
            return {...state, profile:{...action.replies}}
        case GET_HEART:
            return {...state, heart: {...action.replies}}
        case ADD_REPLY:
            return{
                ...state,
                heart: {...state.heart, [action.reply.id]: {...action.reply}},
            }
        case DELETE_REPLY:
            let newState = {
                ...state,
                heart: {...state.heart},
                profile: {...state.profile}
            }

            if(newState.heart[action.reply_id]){
                delete newState.heart[action.reply_id]
            }
            if(newState.profile[action.reply_id]){
                delete newState.profile[action.reply_id]
            }

            return {...newState}

        default:
            return state;
    }
}

export default replyReducer
