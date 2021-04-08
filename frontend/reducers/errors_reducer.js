import {RECEIVE_ERRORS, REMOVE_ERRORS} from '../actions/session_actions'


const errorsReducer = (state={errors: []}, action) => {
    Object.freeze(state)
    let newState = Object.assign({}, state)
    switch(action.type) {
        case RECEIVE_ERRORS:
            newState = action.errors.responseJSON
            return newState.errors
        case REMOVE_ERRORS:
            return []
        default:
            return []
    }
}

export default errorsReducer