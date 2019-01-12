import {
    GUEST_EXECUTE_LOGIN_BY_MODEL, GUEST_EXECUTE_LOGIN_BY_MODEL_SUCCESS, GUEST_EXECUTE_LOGIN_BY_MODEL_FAILURE, RESET_GUEST_EXECUTE_LOGIN_BY_MODEL,
    GUEST_EXECUTE_SIGN_UP_BY_MODEL, GUEST_EXECUTE_SIGN_UP_BY_MODEL_SUCCESS, GUEST_EXECUTE_SIGN_UP_BY_MODEL_FAILURE, RESET_GUEST_EXECUTE_SIGN_UP_BY_MODEL
} from "../action/type/type_guest";

const INITIAL_STATE = {
    form : {
        complete : null, loading : false, error : null
    },
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GUEST_EXECUTE_LOGIN_BY_MODEL :
        case GUEST_EXECUTE_SIGN_UP_BY_MODEL :
            return { ...state, form : { loading : true, complete : null }};
        case GUEST_EXECUTE_LOGIN_BY_MODEL_SUCCESS :
        case GUEST_EXECUTE_SIGN_UP_BY_MODEL_SUCCESS :
            return { ...state, form : { loading : false, complete : action.payload }};
        case GUEST_EXECUTE_LOGIN_BY_MODEL_FAILURE :
        case GUEST_EXECUTE_SIGN_UP_BY_MODEL_FAILURE :
            return { ...state, form : { loading : false, error : action.payload }};
        case RESET_GUEST_EXECUTE_LOGIN_BY_MODEL :
        case RESET_GUEST_EXECUTE_SIGN_UP_BY_MODEL :
            return { ...state, form : { complete : null, error : null }};

        default :
            return state;
    }
}