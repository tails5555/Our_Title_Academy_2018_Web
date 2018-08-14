import {
    FETCH_SEARCH_RESULT, FETCH_SEARCH_RESULT_SUCCESS, FETCH_SEARCH_RESULT_FAILURE, RESET_FETCH_SEARCH_RESULT
} from "../action/action_search";

const INITIAL_STATE = {
    searchList : { results : [], loading : false, error : null }
}

export default function(state = INITIAL_STATE, action) {
    let error;
    switch(action.type){
        case FETCH_SEARCH_RESULT :
            return { ...state, searchList : { results : [], loading : true, error : null }};
        case FETCH_SEARCH_RESULT_SUCCESS :
            return { ...state, searchList : { results : action.payload, loading : false, error : null }};
        case FETCH_SEARCH_RESULT_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, searchList : { results : [], loading : false, error : error }};
        case RESET_FETCH_SEARCH_RESULT :
            return { ...state, searchList : { results : [], loading : false, error : null }};

        default :
            return state;
    }
}