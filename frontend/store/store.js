import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/root_reducer'

const configureStore = (preloadedState={}) => (
    createStore(RootReducer, preloadedState, composeWithDevTools(applyMiddleware(thunk)))
)

//trying this agin

export default configureStore