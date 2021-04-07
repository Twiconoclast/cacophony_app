import {RECEIVE_ERRORS} from '../actions/session_actions'

const _nullSessionErrors = {}

const sessionErrorsReducer = (state=_nullSessionErrors, action) => {
    Object.freeze(state)
    switch(action.type) {
        case RECEIVE_ERRORS:

        default:
            return state
    }
}

export default sessionErrorsReducer