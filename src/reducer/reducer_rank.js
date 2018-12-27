import {
    ANYBODY_FETCH_BRIEF_RANK_REQUESTS, ANYBODY_FETCH_BRIEF_RANK_REQUESTS_SUCCESS, ANYBODY_FETCH_BRIEF_RANK_REQUESTS_FAILURE, RESET_ANYBODY_FETCH_BRIEF_RANK_REQUESTS,
    ANYBODY_FETCH_MAIN_RANK_REQUESTS, ANYBODY_FETCH_MAIN_RANK_REQUESTS_SUCCESS, ANYBODY_FETCH_MAIN_RANK_REQUESTS_FAILURE, RESET_ANYBODY_FETCH_MAIN_RANK_REQUESTS
} from "../action/type/type_rank";

const INITIAL_STATE = {
    brief : { list : [], loading : false, error : null },
    main : { list : [], loading : false, error : null }
}

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case ANYBODY_FETCH_BRIEF_RANK_REQUESTS :
            return { ...state, brief : { list : [], loading : true }};
        case ANYBODY_FETCH_BRIEF_RANK_REQUESTS_SUCCESS :
            return { ...state, brief : { list : action.payload, loading : false }};
        case ANYBODY_FETCH_BRIEF_RANK_REQUESTS_FAILURE :
            return { ...state, brief : { list : [], loading : false, error : action.payload }};
        case RESET_ANYBODY_FETCH_BRIEF_RANK_REQUESTS :
            return { ...state, brief : { list : [], error : null }};

        case ANYBODY_FETCH_MAIN_RANK_REQUESTS :
            return { ...state, main : { list : [], loading : true }};
        case ANYBODY_FETCH_MAIN_RANK_REQUESTS_SUCCESS :
            return { ...state, main : { list : action.payload, loading : false }};
        case ANYBODY_FETCH_MAIN_RANK_REQUESTS_FAILURE :
            return { ...state, main : { list : [], loading : false, error : action.payload }};
        case RESET_ANYBODY_FETCH_MAIN_RANK_REQUESTS :
            return { ...state, main : { list : [], error : null }};

        default :
            return state;
    }
}