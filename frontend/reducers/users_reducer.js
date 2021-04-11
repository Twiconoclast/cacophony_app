export const RECEIVE_USERS = 'RECEIVE_USERS'
export const RECEIVE_USER = 'RECEIVE_USER'

const usersReducer = (state={}, action) => {
    Object.freeze(state)
    let newState = Object.assign({}, state)
    switch(action.type) {
        case RECEIVE_USERS:
            newState = action.users
            return newState
        case RECEIVE_USER:
            newState[Object.keys(action.user)] = action.user
            return newState
        default:
            return state
    }
}

export default usersReducer