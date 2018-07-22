import {
    USER_LOGIN_PROCESS, USER_LOGIN_COMPLETE, USER_LOGIN_EXCEPTION, USER_LOGOUT_PROCESS,
    FETCH_USER_PRINCIPAL_FROM_SERVER_PROCESS, FETCH_USER_PRINCIPAL_FROM_SERVER_COMPLETE, FETCH_USER_PRINCIPAL_FROM_SERVER_EXCEPTION, RESET_FETCH_USER_PRINCIPAL_FROM_SERVER,
    USER_LOAD_SIGN_FORM, USER_LOAD_SIGN_FORM_SUCCESS, USER_LOAD_SIGN_FORM_FAILURE, RESET_USER_LOAD_SIGN_FORM,
    USER_LOAD_AGE_LIST, USER_LOAD_AGE_LIST_SUCCESS, USER_LOAD_AGE_LIST_FAILURE, RESET_USER_LOAD_AGE_LIST,
    USER_LOAD_CITY_LIST, USER_LOAD_CITY_LIST_SUCCESS, USER_LOAD_CITY_LIST_FAILURE, RESET_USER_LOAD_CITY_LIST,
    USER_CONFIRM_CURRENT_PASSWORD, USER_CONFIRM_CURRENT_PASSWORD_SUCCESS, USER_CONFIRM_CURRENT_PASSWORD_FAILURE, RESET_USER_CONFIRM_CURRENT_PASSWORD,
    USER_UPDATE_SIGN_INFO_PROCESS, USER_UPDATE_SIGN_INFO_SUCCESS, USER_UPDATE_SIGN_INFO_FAILURE, RESET_USER_UPDATE_SIGN_INFO,
    ADMIN_LOAD_USER_LIST, ADMIN_LOAD_USER_LIST_SUCCESS, ADMIN_LOAD_USER_LIST_FAILURE,
    MANAGER_LOAD_USER_LIST, MANAGER_LOAD_USER_LIST_SUCCESS, MANAGER_LOAD_USER_LIST_FAILURE, RESET_COMMON_LOAD_USER_LIST
} from '../action/action_user';

const INITIAL_STATE = {
    signInfo : {
        signModel : null, loading : false, error : null
    },
    cityElements : {
        cities : [], loading : false, error : null
    },
    ageElements : {
        ages : [], loading : false, error : null
    },
    passwordElement : {
        result : false, loading : false, error : null
    },
    accessUser : {
        principal : null, loading : false, error : null
    },
    detailResult : {
        detail : null, loading : false, error : null
    },
    principalList : {
        users : [], loading : false, error : null
    }
}

export default function(state = INITIAL_STATE, action){
    let error;
    switch(action.type){
        case USER_LOAD_AGE_LIST :
            return { ...state, ageElements : { ages : [], loading : true, error : null }};
        case USER_LOAD_AGE_LIST_SUCCESS :
            return { ...state, ageElements : { ages : action.payload, loading : false, error : null}};
        case USER_LOAD_AGE_LIST_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, ageElements : { ages : [], loading : false, error : error}};
        case RESET_USER_LOAD_AGE_LIST :
            return { ...state, ageElements : { ages : [], loading : false, error : null}};

        case USER_LOAD_CITY_LIST :
            return { ...state, cityElements : { cities : [], loading : true, error : null }};
        case USER_LOAD_CITY_LIST_SUCCESS :
            return { ...state, cityElements : { cities : action.payload, loading : false, error : null}};
        case USER_LOAD_CITY_LIST_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, cityElements : { cities : [], loading : false, error : error}};
        case RESET_USER_LOAD_CITY_LIST :
            return { ...state, cityElements : { cities : [], loading : false, error : null}};

        case USER_LOGIN_PROCESS :
            return { ...state, accessUser : { principal : null, loading : true, error : null }};
        case USER_LOGIN_COMPLETE :
            return { ...state, accessUser : { principal : action.payload, loading : false, error : null }};
        case USER_LOGIN_EXCEPTION :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, accessUser : { principal : null, loading : false, error : error }};
        case USER_LOGOUT_PROCESS :
            return { ...state, accessUser : { principal : null, loading : false, error : null }};

        case FETCH_USER_PRINCIPAL_FROM_SERVER_PROCESS :
            return { ...state, accessUser : { principal : null, loading : true, error : null }};
        case FETCH_USER_PRINCIPAL_FROM_SERVER_COMPLETE :
            return { ...state, accessUser : { principal : action.payload, loading : false, error : null }};
        case FETCH_USER_PRINCIPAL_FROM_SERVER_EXCEPTION :
            error = action.payload || { message : action.payload };
            return { ...state, accessUser : { principal : null, loading : false, error : error }};
        case RESET_FETCH_USER_PRINCIPAL_FROM_SERVER :
            return { ...state, accessUser : { principal : null, loading : false, error : null }};

        case USER_LOAD_SIGN_FORM :
            return { ...state, signInfo : { signModel : null, loading : true, error : null }};
        case USER_LOAD_SIGN_FORM_SUCCESS :
            return { ...state, signInfo : { signModel : action.payload, loading : true, error : null }};
        case USER_LOAD_SIGN_FORM_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, signInfo : { signModel : null, loading : false, error : error }};
        case RESET_USER_LOAD_SIGN_FORM :
            return { ...state, signInfo : { signModel : null, loading : false, error : null }};

        case USER_CONFIRM_CURRENT_PASSWORD :
            return { ...state, passwordElement : { result : false, loading : true, error : null }};
        case USER_CONFIRM_CURRENT_PASSWORD_SUCCESS :
            return { ...state, passwordElement : { result : action.payload, loading : false, error : null }};
        case USER_CONFIRM_CURRENT_PASSWORD_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, passwordElement : { result : false, loading : false, error : error }};
        case RESET_USER_CONFIRM_CURRENT_PASSWORD :
            return { ...state, passwordElement : { result : false, loading : false, error : null }};

        case USER_UPDATE_SIGN_INFO_PROCESS :
            return { ...state, detailResult : { detail : null, loading : true, error : null }};
        case USER_UPDATE_SIGN_INFO_SUCCESS :
            return { ...state, detailResult : { detail : action.payload, loading : false, error : null }};
        case USER_UPDATE_SIGN_INFO_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, detailResult : { detail : null, loading : false, error : error }};
        case RESET_USER_UPDATE_SIGN_INFO :
            return { ...state, detailResult : { detail : null, loading : false, error : null }};

        case ADMIN_LOAD_USER_LIST :
        case MANAGER_LOAD_USER_LIST :
            return { ...state, principalList : { users : [], loading : true, error : null }};
        case ADMIN_LOAD_USER_LIST_SUCCESS :
        case MANAGER_LOAD_USER_LIST_SUCCESS :
            return { ...state, principalList : { users : action.payload, loading : false, error : null }};
        case ADMIN_LOAD_USER_LIST_FAILURE :
        case MANAGER_LOAD_USER_LIST_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, principalList : { users : [], loading : false, error : error }};
        case RESET_COMMON_LOAD_USER_LIST :
            return { ...state, principalList : { users : [], loading : false, error : null }};

        default :
            return state;
    }
}