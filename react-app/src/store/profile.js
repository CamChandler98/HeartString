
const GET = 'profile/get'

const get = (user) => ({
    type: GET,
    user
})

export const getUser = (username) => async (dispatch) =>{
    let res = await fetch(`/api/users/${username}`)
    let user = await res.json()
    dispatch(get(user))
}

const profileReducer = (state = {}, action) =>{
    switch(action.type){
        case GET:{
            let newState = {...state}
            newState = action.user
            return{
                ...newState
            }
        }
        default:
            return state
    }
}

export default profileReducer
