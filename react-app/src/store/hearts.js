const GET = 'hearts/GET'
const GET_USER = 'hearts/GET_USER'
const ADD_HEART = 'hearts/ADD_HEART'
const GET_ONE = 'hearts/GET_ONE'
const CLOSE = 'hearts/CLOSE'
const GET_SESSION = 'hearts/GET_SESSION'
const DELETE_HEART = 'hearts/DELETE_HEART'
const GET_POPULAR = 'hearts/GET_POPULAR'
const GET_RECENT = 'hearts/GET_RECENT'
const getHearts = (hearts) => ({
    type: GET,
    hearts
})

const getHeart = (heart) =>({
    type: GET_ONE,
    heart
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
const getRecentHearts = (hearts) => ({
    type: GET_RECENT,
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

const closeHeart = (heart) => ({
    type: CLOSE,
    heart
})


export const goCloseHeart = (heart_id) => async(dispatch) => {
    let res = await fetch(`/api/hearts/${heart_id}/close`, {
        method: 'POST'
    })

    if(res.ok){
        let data = await res.json()

        dispatch(closeHeart(data))
    }
}
export const goGetHearts = () => async (dispatch) => {
    let res = await fetch('/api/hearts/')

    if(res.ok){
        let data = await res.json()
        dispatch(getHearts(data))
    }
}

export const goGetHeart = (heartId) => async (dispatch) => {
    console.log('going to get that heart you asked for')
    let res = await fetch(`/api/hearts/${heartId}`)

    if(res.ok){
        console.log('got that heart, showing you soon')
        let data = await res.json()
        dispatch(getHeart(data))
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
    let res = await fetch('/api/hearts/popular')

    if(res.ok){
        let data = await res.json()
        dispatch(getPopularHearts(data.hearts))
    }
}

export const goGetRecentHearts = () => async (dispatch) => {
    let res = await fetch('/api/hearts/recent')

    if(res.ok){
        let data = await res.json()
        dispatch(getRecentHearts(data))
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
            return data.errors
        }
    }else{
        return ['An error occurred. Please try again']
    }
}

export const goDeleteHeart = (heart_id) => async (dispatch) => {
    const res = await fetch(`/api/hearts/${heart_id}`,{
        method:'DELETE'
    })

    if(res.ok){
        const data = await res.json()

        dispatch(deleteHeart(data.deleted))
    }
}


const initialState = {profile:{}, recent: {}, popular: {}, all: {} ,session_user:{}}



const heartReducer = (state = initialState, action) =>{
    switch (action.type){
        case GET:
            return {...state, all:{...action.hearts}}

        case GET_USER:
            return {...state, profile:{...action.hearts}, all: {...state.all, ...action.hearts}}
        case GET_SESSION:
            return {...state, session_user: {...action.hearts}, all: {...state.all, ...action.hearts}}
        case GET_POPULAR:
            let popularHearts = action.hearts.reduce((accum, heart) => {
                accum[heart.id] = heart
                return accum
            }, {})
            return {...state, popular: {...popularHearts}}
        case GET_RECENT:
            return {...state, recent :{...action.hearts}, all: {...state.all, ...action.hearts}}
        case GET_ONE:
            return{
                ...state, all: {...state.all, [action.heart.id]: {...action.heart}}
            }
        case ADD_HEART:
            return{
                ...state,
                session_user: {...state.session_user, [action.heart.id]: {...action.heart}},
                recent: {...state.recent, [action.heart.id]: {...action.heart}},
                all: {...state.all, [action.heart.id]: {...action.heart}},
            }
        case DELETE_HEART:
            let newState = {
                ...state,
                session_user: {...state.session_user},
                recent: {...state.recent},
                all: {...state.all}
            }

            if(newState.recent[action.heart_id]){
                delete newState.recent[action.heart_id]
            }

            if(newState.session_user[action.heart_id]){
                delete newState.session_user[action.heart_id]
            }

            if(newState.all[action.heart_id]){
                delete newState.all[action.heart_id]
            }
            if(newState.popular[action.heart_id]){
                delete newState.popular[action.heart_id]
            }

            return {...newState}



        case CLOSE:
            let closeState = {...state}
            if ( closeState.all[action.heart.id]){
                closeState.all = {...closeState.all, [action.heart.id]: {...action.heart}}
            }
            if ( closeState.profile[action.heart.id]){
                closeState.profile = {...closeState.profile, [action.heart.id]: {...action.heart}}
            }
            if ( closeState.session_user[action.heart.id]){
                closeState.session_user = {...closeState.session_user, [action.heart.id]: {...action.heart}}
            }
            if ( closeState.recent[action.heart.id]){
                closeState.recent = {...closeState.recent, [action.heart.id]: {...action.heart}}
            }

            return {...closeState}

        default:
            return state;
    }
}

export default heartReducer
