const GET = 'connections/GET'
const ADD = 'connections/ADD'
const DELETE = 'connections/DELTE'


const get = (connections) => ({
    type: GET,
    connections
})
const add = (conenction) => ({
    type:ADD,
    conenction
})

const deleteCon = (connectionId) => ({
    type:DELETE,
    connectionId
})
export const getConnections = (userId) => async (dispatch) => {
    let res = await fetch(`/api/connections/user/${userId}`)

    if(res.ok){
        let data = await res.json()

        dispatch(get(data))
    }
}

export const addConnection = (user_one, user_two, heart_id, reply_id) => async (dispatch) => {
    let res = await fetch('/api/connections/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            user_one,
            user_two,
            heart_id,
            reply_id
        })
    })

    if(res.ok){
        let data = await res.json()
        dispatch(add(data))
    }
}


export const deleteConnection = (user_one, user_two) => async (dispatch) => {
    let res = await fetch('/api/connections/',{
        method: 'DELETE',
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
        dispatch(deleteCon(data))
    }
}
const initialState = {}

const connectionReducer = (state = initialState , action) => {
    switch(action.type){
        case GET:
            return { ...action.connections}
        case ADD:
            return {...state, ...action.conenction}
        case DELETE:
            let newState = {...state}

            if(newState[action.connectionId]){
                delete newState[action.connectionId]
            }
            return{...newState}

        default:
            return {...state}
    }
}

export default connectionReducer
