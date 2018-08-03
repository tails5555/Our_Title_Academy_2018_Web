import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import UserReducer from './reducer_user';
import DetailReducer from './reducer_detail';
import ProfileReducer from './reducer_profile';
import CategoryReducer from './reducer_category';
import RequestReducer from './reducer_request';
import RankReducer from './reducer_rank';
export const rootReducer = combineReducers({
    form : formReducer,
    user : UserReducer,
    detail : DetailReducer,
    profile : ProfileReducer,
    category : CategoryReducer,
    request : RequestReducer,
    rank : RankReducer
});