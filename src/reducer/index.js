import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import GuestRender from './reducer_guest';
import UserReducer from './reducer_user';
import DetailReducer from './reducer_detail';
import ProfileReducer from './reducer_profile';
import CategoryReducer from './reducer_category';
import RequestReducer from './reducer_request';
import RankReducer from './reducer_rank';
import TitleReducer from './reducer_title';
import CommentReducer from './reducer_comment';
import SearchReducer from './reducer_search';
import OwnerReducer from './reducer_owner';

export const rootReducer = combineReducers({
    guest : GuestRender,
    form : formReducer,
    user : UserReducer,
    detail : DetailReducer,
    profile : ProfileReducer,
    rank : RankReducer,
    category : CategoryReducer,
    request : RequestReducer,
    title : TitleReducer,
    comment : CommentReducer,
    search : SearchReducer,
    owner : OwnerReducer
});