import { combineReducers } from "redux"
import entitiesReducer from './entities_reducer'
import sessionsReducer from './sessions_reducer'
import errorsReducer from './errors_reducer'


const RootReducer = combineReducers({
    entities: entitiesReducer,
    sessions: sessionsReducer,
    errors: errorsReducer
})



export default RootReducer