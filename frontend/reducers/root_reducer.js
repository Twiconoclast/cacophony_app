import { combineReducers } from "redux"
import entitiesReducer from './entities_reducer'
import sessionsReducer from './sessions_reducer'
import modalsReducer from './modals_reducer'
import errorsReducer from './errors_reducer'


const RootReducer = combineReducers({
    entities: entitiesReducer,
    sessions: sessionsReducer,
    modals: modalsReducer,
    errors: errorsReducer
})



export default RootReducer