const GET = 'hearts/GET'
const GET_USER = 'hearts/GET_USER'
const ADD_HEART = 'hearts/ADD_HEART'
const GET_SESSION = 'hearts/GET_SESSION'
const DELETE_HEART = 'hearts/DELETE_HEART'
const GET_POPULAR = 'hearts/GET_POPULAR'

const getHearts = (hearts) => ({
    type: GET,
    hearts
})

const getUserHearts = (hearts) => ({
    type: GET_USER,
    hearts
})
const getSessionHearts = (hearts) =>( {
    type: GET_SESSION,
    hearts
})

const getPopularHearts = (hearts) => ({
    type: GET_POPULAR,
    hearts
})
const addHeart = (heart) => ({
    type: ADD_HEART,
    heart
})

const updateHeart = (heart) => ({
    type: ADD_HEART,
    heart
})

const deleteHeart = (heart_id) => ({
    type: DELETE_HEART,
    heart_id
})

export const goGetHearts = () => async (dispatch) => {
    let res = await fetch('/api/hearts/')

    if(res.ok){
        let data = await res.json()
        dispatch(getHearts(data))
    }
}

export const goGetUserHearts = (userId) => async (dispatch) => {
    let res = await fetch(`/api/hearts/user/${userId}`)

    if(res.ok){
        let data = await res.json()
        dispatch(getUserHearts(data))
    }
}


export const goGetSessionHearts = (userId) => async (dispatch) => {
    let res = await fetch(`/api/hearts/user/${userId}`)

    if(res.ok){
        let data = await res.json()
        dispatch(getSessionHearts(data))
    }
}

export const goGetPopularHearts = () => async (dispatch) => {
    let res = await fetch('/api/hearts/home')

    if(res.ok){
        let data = await res.json()
        dispatch(getPopularHearts(data.hearts))
    }
}
export const goAddHeart = ({content, time_to_live, image, user_id }) => async (dispatch) => {
    const formData = new FormData()

    formData.append('content', content )
    formData.append('time_to_live', time_to_live)

    if(image) formData.append('image', image);

    formData.append('user_id', user_id)

    const res = await fetch('/api/hearts/', {
        method: 'POST',
        body: formData
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(addHeart(data))
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

export const goUpdateHeart = ({heart_id,content_url,time_to_live, user_id, content}) => async (dispatch) => {

    const res = await fetch('/api/hearts/edit',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body : JSON.stringify( {
            heart_id,
            content_url,
            content,
            time_to_live,
            user_id
        })
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(updateHeart(data))
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

export const goDeleteHeart = (heart_id) => async (dispatch) => {
    const res = await fetch(`/api/heart/${heart_id}`,{
        method: 'DELETE'
    })

    if(res.ok){
        const data = await res.json()

        dispatch(deleteHeart(data.deleted))
    }
}


const initialState = {profile:{}, home: [], all: {} ,session_user:{}}



const heartReducer = (state = initialState, action) =>{
    switch (action.type){
        case GET:
            return {...state, all:{...action.hearts}}

        case GET_USER:
            return {...state, profile:{...action.hearts}}
        case GET_SESSION:
            return {...state, session_user: {...action.hearts}}
        case GET_POPULAR:
            return {...state, home :[...action.hearts]}
        case ADD_HEART:
            return{
                ...state,
                session_user: {...state.session_user, [action.heart.id]: {...action.heart}},
                home: [...action.heart,...state.home.hearts],
                all: {...state.all, [action.heart.id]: {...action.heart}},
            }
        case DELETE_HEART:
            let newState = {
                ...state,
                session_user: {...state.session_user},
                home: {...state.home},
                all: {...state.all}
            }

            if(newState.home[action.heart_id]){
                delete newState.home[action.heart_id]
            }

            if(newState.session_user[action.heart_id]){
                delete newState.session_user[action.heart_id]
            }

            if(newState.all[action.heart_id]){
                delete newState.all[action.heart_id]
            }

            return {...newState}

        default:
            return state;
    }
}

export default heartReducer
