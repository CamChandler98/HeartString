const GET = 'conneections/GET'

const get = (connections) => ({
    type: GET,
    connections
})


export const getConnections = (userId) => async (dispatch) => {
    let res = await fetch(`/api/connections/user/${userId}`)

    if(res.ok){
        let data = await res.json()

        dispatch(get(data))
    }
}


const initialState = {}

const connectionReducer = (state = initialState , action) => {
    switch(action.type){
        case GET:
            return {...state, ...action.connections}
        default:
            return {...state}
    }
}

export default connectionReducer
