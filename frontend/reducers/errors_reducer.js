import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer.js';
import userErrorsReducer from './user_errors_reducer.js';

const errorsReducer = combineReducers({
  session_errors: sessionErrorsReducer,
  user_errors: userErrorsReducer
  // We can add as many reducers as we need here.
});

export default errorsReducer