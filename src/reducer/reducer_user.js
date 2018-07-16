import {
    USER_LOGIN_PROCESS, USER_LOGIN_COMPLETE, USER_LOGIN_EXCEPTION, RESET_USER_LOGIN
} from '../action/action_user';

const INITIAL_STATE = {
    accessUser : {
        principal : null, loading : false, error : null
    }
}

export default function(state = INITIAL_STATE, action){
    let error;
    switch(action.type){
        case USER_LOGIN_PROCESS :
            return { ...state, accessUser : { principal : null, loading : true, error : null }};
        case USER_LOGIN_COMPLETE :
            return { ...state, accessUser : { principal : action.payload, loading : false, error : null }};
        case USER_LOGIN_EXCEPTION :
            error = action.payload.data || { message : action.payload.message }
            return { ...state, accessUser : { principal : null, loading : false, error : error}};
        case RESET_USER_LOGIN :
            return { ...state, accessUser : { principal : null, loading : false, error : null}};

        default :
            return state;
    }
}