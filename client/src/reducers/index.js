import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import SearchReducer from './SearchReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    search:SearchReducer
});