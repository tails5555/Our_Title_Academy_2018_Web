import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import UserReducer from './reducer_user';

export const rootReducer = combineReducers({
    form : formReducer,
    user : UserReducer
});