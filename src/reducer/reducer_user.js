import {
    USER_FETCH_MY_SIGN_INFO, USER_FETCH_MY_SIGN_INFO_SUCCESS, USER_FETCH_MY_SIGN_INFO_FAILURE, RESET_USER_FETCH_MY_SIGN_INFO,
    USER_UPDATE_MY_SIGN_INFO, USER_UPDATE_MY_SIGN_INFO_SUCCESS, USER_UPDATE_MY_SIGN_INFO_FAILURE, RESET_USER_UPDATE_MY_SIGN_INFO
} from "../action/type/type_user";

import {
    USER_LOGOUT_PROCESS,
    FETCH_USER_PRINCIPAL_FROM_SERVER_PROCESS, FETCH_USER_PRINCIPAL_FROM_SERVER_COMPLETE, FETCH_USER_PRINCIPAL_FROM_SERVER_EXCEPTION, RESET_FETCH_USER_PRINCIPAL_FROM_SERVER,
    ADMIN_LOAD_USER_LIST, ADMIN_LOAD_USER_LIST_SUCCESS, ADMIN_LOAD_USER_LIST_FAILURE,
    MANAGER_LOAD_USER_LIST, MANAGER_LOAD_USER_LIST_SUCCESS, MANAGER_LOAD_USER_LIST_FAILURE, RESET_COMMON_LOAD_USER_LIST,
    ADMIN_LOAD_USER_INFO, ADMIN_LOAD_USER_INFO_SUCCESS, ADMIN_LOAD_USER_INFO_FAILURE,
    MANAGER_LOAD_USER_INFO, MANAGER_LOAD_USER_INFO_SUCCESS, MANAGER_LOAD_USER_INFO_FAILURE, RESET_COMMON_LOAD_USER_INFO
} from '../action/action_user';

const INITIAL_STATE = {
    form : {
        element : null, complete : null, loading : false, error : null
    },
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
    accessor : {
        principal : null, loading : false, error : null
    },
    detailResult : {
        detail : null, loading : false, error : null
    },
    principalList : {
        users : [], loading : false, error : null
    },
    principalInfo : {
        detail : null, loading : false, error : null
    }
}

export default function(state = INITIAL_STATE, action){
    let error;
    switch(action.type){
        case USER_FETCH_MY_SIGN_INFO :
            return { ...state, form : { element : null, loading : true }};
        case USER_FETCH_MY_SIGN_INFO_SUCCESS :
            return { ...state, form : { element : action.payload, loading : false }};
        case USER_FETCH_MY_SIGN_INFO_FAILURE :
            return { ...state, form : { error : action.payload, loading : false }};
        case RESET_USER_FETCH_MY_SIGN_INFO :
            return { ...state, form : { error : null, element : null }};

        case USER_UPDATE_MY_SIGN_INFO :
            return { ...state, form : { complete : null, loading : true }};
        case USER_UPDATE_MY_SIGN_INFO_SUCCESS :
            return { ...state, form : { complete : action.payload, loading : false }};
        case USER_UPDATE_MY_SIGN_INFO_FAILURE :
            return { ...state, form : { error : action.payload, loading : false }};
        case RESET_USER_UPDATE_MY_SIGN_INFO :
            return { ...state, form : { error : null, complete : null }};


        case USER_LOGOUT_PROCESS :
            return { ...state, accessor : { principal : null, loading : false, error : null }};

        case FETCH_USER_PRINCIPAL_FROM_SERVER_PROCESS :
            return { ...state, accessor : { principal : null, loading : true, error : null }};
        case FETCH_USER_PRINCIPAL_FROM_SERVER_COMPLETE :
            return { ...state, accessor : { principal : action.payload, loading : false, error : null }};
        case FETCH_USER_PRINCIPAL_FROM_SERVER_EXCEPTION :
            error = action.payload || { message : action.payload };
            return { ...state, accessor : { principal : null, loading : false, error : error }};
        case RESET_FETCH_USER_PRINCIPAL_FROM_SERVER :
            return { ...state, accessor : { principal : null, loading : false, error : null }};

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

        case ADMIN_LOAD_USER_INFO :
        case MANAGER_LOAD_USER_INFO :
            return { ...state, principalInfo : { detail : null, loading : true, error : null }};
        case ADMIN_LOAD_USER_INFO_SUCCESS :
        case MANAGER_LOAD_USER_INFO_SUCCESS :
            return { ...state, principalInfo : { detail : action.payload, loading : false, error : null }};
        case ADMIN_LOAD_USER_INFO_FAILURE :
        case MANAGER_LOAD_USER_INFO_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, principalInfo : { detail : null, loading : false, error : error }};
        case RESET_COMMON_LOAD_USER_INFO :
            return { ...state, principalInfo : { detail : null, loading : false, error : null }};

        default :
            return state;
    }
}