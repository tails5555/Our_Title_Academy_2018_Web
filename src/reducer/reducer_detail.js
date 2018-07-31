import {
    GUEST_LOAD_AGE_LIST, GUEST_LOAD_AGE_LIST_SUCCESS, GUEST_LOAD_AGE_LIST_FAILURE, RESET_GUEST_LOAD_AGE_LIST,
    GUEST_LOAD_CITY_LIST, GUEST_LOAD_CITY_LIST_SUCCESS, GUEST_LOAD_CITY_LIST_FAILURE, RESET_GUEST_LOAD_CITY_LIST,
    GUEST_CONFIRM_LOGIN_ID, GUEST_CONFIRM_LOGIN_ID_SUCCESS, GUEST_CONFIRM_LOGIN_ID_FAILURE, RESET_GUEST_CONFIRM_LOGIN_ID,
    GUEST_SIGN_UP_PROCESS, GUEST_SIGN_UP_SUCCESS, GUEST_SIGN_UP_FAILURE
} from "../action/action_guest";

const INITIAL_STATE = {
    cityElements : {
        cities : [], loading : false, error : null
    },
    ageElements : {
        ages : [], loading : false, error : null
    },
    loginIdElement : {
        result : false, loading : false, error : null
    },
    detailResult : {
        detail : null, loading : false, error : null
    }
}

export default function(state = INITIAL_STATE, action){
    let error;
    switch(action.type){
        case GUEST_LOAD_AGE_LIST :
            return { ...state, ageElements : { ages : [], loading : true, error : null }};
        case GUEST_LOAD_AGE_LIST_SUCCESS :
            return { ...state, ageElements : { ages : action.payload, loading : false, error : null}};
        case GUEST_LOAD_AGE_LIST_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, ageElements : { ages : [], loading : false, error : error}};
        case RESET_GUEST_LOAD_AGE_LIST :
            return { ...state, ageElements : { ages : [], loading : false, error : null}};

        case GUEST_LOAD_CITY_LIST :
            return { ...state, cityElements : { cities : [], loading : true, error : null }};
        case GUEST_LOAD_CITY_LIST_SUCCESS :
            return { ...state, cityElements : { cities : action.payload, loading : false, error : null}};
        case GUEST_LOAD_CITY_LIST_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, cityElements : { cities : [], loading : false, error : error}};
        case RESET_GUEST_LOAD_CITY_LIST :
            return { ...state, cityElements : { cities : [], loading : false, error : null}};

        case GUEST_CONFIRM_LOGIN_ID :
            return { ...state, loginIdElement : { result : false, loading : true, error : null}};
        case GUEST_CONFIRM_LOGIN_ID_SUCCESS :
            return { ...state, loginIdElement : { result : action.payload, loading : false, error : null}};
        case GUEST_CONFIRM_LOGIN_ID_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, loginIdElement : { result : false, loading : false, error : error}};
        case RESET_GUEST_CONFIRM_LOGIN_ID :
            return { ...state, loginIdElement : { result : false, loading : false, error : null}};

        case GUEST_SIGN_UP_PROCESS :
            return { ...state, detailResult : { detail : null, loading : true, error : null}};
        case GUEST_SIGN_UP_SUCCESS :
            return { ...state, detailResult : { detail : action.payload, loading : false, error : null}};
        case GUEST_SIGN_UP_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, detailResult : { detail : null, loading : false, error : error}};

        default :
            return state;
    }
}