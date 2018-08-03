import {
    FETCH_CURRENT_BEST_REQUEST, FETCH_CURRENT_BEST_REQUEST_SUCCESS, FETCH_CURRENT_BEST_REQUEST_FAILURE, RESET_FETCH_CURRENT_BEST_REQUEST
} from "../action/action_today_rank";

const INITIAL_STATE = {
    currentRank : { requests : [], loading : false, error : null }
}

export default function(state = INITIAL_STATE, action){
    let error;
    switch(action.type){
        case FETCH_CURRENT_BEST_REQUEST :
            return { ...state, currentRank : { requests : [], loading : true, error : null }};
        case FETCH_CURRENT_BEST_REQUEST_SUCCESS :
            return { ...state, currentRank : { requests : action.payload, loading : false, error : null }};
        case FETCH_CURRENT_BEST_REQUEST_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, currentRank : { requests : [], loading : false, error : error }};
        case RESET_FETCH_CURRENT_BEST_REQUEST :
            return { ...state, currentRank : { requests : [], loading : false, error : null }};

        default :
            return state;
    }
}