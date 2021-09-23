const GET = 'hearts/GET'
const GET_USER = 'hearts/GET_USER'
const ADD_HEART = 'hearts/ADD_HEART'

const getHearts = (hearts) => ({
    type: GET,
    hearts
})

const getUserHearts = (hearts) => ({
    type: GET_USER,
    hearts
})

const addHeart = (heart) => ({
    type: ADD_HEART,
    heart
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


const initialState = {profile:{}, home: {}, all: {} ,session_user:{}}



const heartReducer = (state = initialState, action) =>{
    switch (action.type){
        case GET:
            return {...state, all:{...action.hearts}}

        case GET_USER:
            return {...state, profile:{...action.hearts}}

        case ADD_HEART:
            return{
                ...state,
                session_user: {...state.session_user, [action.heart.id]: {...action.heart}},
                home: {...state.home, [action.heart.id]: {...action.heart}},
                all: {...state.all, [action.heart.id]: {...action.heart}},
            }
        default:
            return state;
    }
}

export default heartReducer
