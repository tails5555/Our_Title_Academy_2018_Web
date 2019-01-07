import {
    GUEST_EXECUTE_LOGIN_BY_MODEL, GUEST_EXECUTE_LOGIN_BY_MODEL_SUCCESS, GUEST_EXECUTE_LOGIN_BY_MODEL_FAILURE, RESET_GUEST_EXECUTE_LOGIN_BY_MODEL,
    GUEST_FETCH_AGE_LIST, GUEST_FETCH_AGE_LIST_SUCCESS, GUEST_FETCH_AGE_LIST_FAILURE,
    GUEST_FETCH_CITY_LIST, GUEST_FETCH_CITY_LIST_SUCCESS, GUEST_FETCH_CITY_LIST_FAILURE
} from "../action/type/type_user";

const INITIAL_STATE = {
    form : {
        complete : null, loading : false, error : null
    },
    city : {
        list : [], loading : false, error : null
    },
    age : {
        list : [], loading : false, error : null
    }
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GUEST_EXECUTE_LOGIN_BY_MODEL :
            return { ...state, form : { loading : true, complete : null }};
        case GUEST_EXECUTE_LOGIN_BY_MODEL_SUCCESS :
            return { ...state, form : { loading : false, complete : action.payload }};
        case GUEST_EXECUTE_LOGIN_BY_MODEL_FAILURE :
            return { ...state, form : { loading : false, error : action.payload }};
        case RESET_GUEST_EXECUTE_LOGIN_BY_MODEL :
            return { ...state, form : { complete : null, error : null }};

        case GUEST_FETCH_CITY_LIST :
            return { ...state, city : { list : [], loading : true }};
        case GUEST_FETCH_CITY_LIST_SUCCESS :
            return { ...state, city : { list : action.payload, loading : false }};
        case GUEST_FETCH_CITY_LIST_FAILURE :
            return { ...state, city : { loading : false, error : action.payload }};

        case GUEST_FETCH_AGE_LIST :
            return { ...state, age : { list : [], loading : true }};
        case GUEST_FETCH_AGE_LIST_SUCCESS :
            return { ...state, age : { list : action.payload, loading : false }};
        case GUEST_FETCH_AGE_LIST_FAILURE :
            return { ...state, age : { loading : false, error : action.payload }};

        default :
            return state;
    }
}