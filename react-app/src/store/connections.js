const GET = 'conneections/GET'
const ADD = 'connections/ADD'
const get = (connections) => ({
    type: GET,
    connections
})
const add = (conenction) => ({
    type:ADD,
    conenction
})

export const getConnections = (userId) => async (dispatch) => {
    let res = await fetch(`/api/connections/user/${userId}`)

    if(res.ok){
        let data = await res.json()

        dispatch(get(data))
    }
}

export const addConnection = (user_one, user_two) => async (dispatch) => {
    let res = await fetch('/api/connections/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            user_one,
            user_two
        })
    })

    if(res.ok){
        let data = await res.json()
        dispatch(add(data))
    }
}
const initialState = {}

const connectionReducer = (state = initialState , action) => {
    switch(action.type){
        case GET:
            return {...state, ...action.connections}
        case ADD:
            return {...state, ...action.conenction}
        default:
            return {...state}
    }
}

export default connectionReducer
