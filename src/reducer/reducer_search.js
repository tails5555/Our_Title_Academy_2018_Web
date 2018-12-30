import {
    ANYBODY_FETCH_SEARCH_RESULT, ANYBODY_FETCH_SEARCH_RESULT_SUCCESS, ANYBODY_FETCH_SEARCH_RESULT_FAILURE, RESET_ANYBODY_FETCH_SEARCH_RESULT
} from "../action/type/type_search";

const INITIAL_STATE = {
    list : [], loading : false, error : null
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case ANYBODY_FETCH_SEARCH_RESULT :
            return { ...state, list : [], loading : true };
        case ANYBODY_FETCH_SEARCH_RESULT_SUCCESS :
            return { ...state, list : action.payload, loading : false };
        case ANYBODY_FETCH_SEARCH_RESULT_FAILURE :
            return { ...state, loading : false, error : action.payload };
        case RESET_ANYBODY_FETCH_SEARCH_RESULT :
            return { ...state, list : [], error : null };

        default :
            return state;
    }
}