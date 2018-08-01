import {
    FETCH_HOME_REQUEST_BRIEF, FETCH_HOME_REQUEST_BRIEF_SUCCESS, FETCH_HOME_REQUEST_BRIEF_FAILURE, RESET_FETCH_HOME_REQUEST_BRIEF
} from "../action/action_request";

const INITIAL_STATE = {
    requestList : { requests : [], loading : false, error : null }
}

export default function(state = INITIAL_STATE, action){
    let error;
    switch(action.type){
        case FETCH_HOME_REQUEST_BRIEF :
            return { ...state, requestList : { requests : [], loading : true, error : null }};
        case FETCH_HOME_REQUEST_BRIEF_SUCCESS :
            return { ...state, requestList : { requests : action.payload, loading : false, error : null }};
        case FETCH_HOME_REQUEST_BRIEF_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, requestList : { requests : [], loading : false, error : error }};
        case RESET_FETCH_HOME_REQUEST_BRIEF :
            return { ...state, requestList : { requests : [], loading : false, error : null }};

        default :
            return state;
    }
}