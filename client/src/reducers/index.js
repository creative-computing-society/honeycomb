import { combineReducers } from 'redux';
import auth from './auth'
import questions from './questions';

export default combineReducers({
    auth,
    questions
})