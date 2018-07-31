import {
    APP_LOAD_ANYTHING_REQUESTS, APP_LOAD_ANYTHING_REQUESTS_SUCCESS, APP_LOAD_ANYTHING_REQUESTS_FAILURE, RESET_APP_LOAD_ANYTHING_REQUESTS
} from "../action/action_request";

const INITIAL_STATE = {
    requestList : { requests : [], loading : false, error : null }
}

export default function(state = INITIAL_STATE, action){
    let error;
    switch(action.type){
        case APP_LOAD_ANYTHING_REQUESTS :
            return { ...state, requestList : { requests : [], loading : true, error : null }};
        case APP_LOAD_ANYTHING_REQUESTS_SUCCESS :
            return { ...state, requestList : { requests : action.payload, loading : false, error : null }};
        case APP_LOAD_ANYTHING_REQUESTS_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, requestList : { requests : [], loading : false, error : error }};
        case RESET_APP_LOAD_ANYTHING_REQUESTS :
            return { ...state, requestList : { requests : [], loading : false, error : null }};

        default :
            return state;
    }
}