import {
    GUEST_FETCH_AGE_LIST, GUEST_FETCH_AGE_LIST_SUCCESS, GUEST_FETCH_AGE_LIST_FAILURE,
    GUEST_FETCH_CITY_LIST, GUEST_FETCH_CITY_LIST_SUCCESS, GUEST_FETCH_CITY_LIST_FAILURE
} from '../action/type/type_guest';

import {
    USER_FETCH_AGE_LIST, USER_FETCH_AGE_LIST_SUCCESS, USER_FETCH_AGE_LIST_FAILURE,
    USER_FETCH_CITY_LIST, USER_FETCH_CITY_LIST_SUCCESS, USER_FETCH_CITY_LIST_FAILURE
} from "../action/type/type_user";

import {
    GUEST_FIND_LOGIN_ID, GUEST_FIND_LOGIN_ID_SUCCESS, GUEST_FIND_LOGIN_ID_FAILURE, RESET_GUEST_FIND_LOGIN_ID
} from "../action/action_guest";

const INITIAL_STATE = {
    city : {
        list : [], loading : false, error : null
    },
    age : {
        list : [], loading : false, error : null
    },
    findLoginId : {
        result : null, loading : false, error : null
    }
}

export default function(state = INITIAL_STATE, action){
    let error;
    switch(action.type){
        case GUEST_FETCH_CITY_LIST :
        case USER_FETCH_CITY_LIST :
            return { ...state, city : { list : [], loading : true }};
        case GUEST_FETCH_CITY_LIST_SUCCESS :
        case USER_FETCH_CITY_LIST_SUCCESS :
            return { ...state, city : { list : action.payload, loading : false }};
        case GUEST_FETCH_CITY_LIST_FAILURE :
        case USER_FETCH_CITY_LIST_FAILURE :
            return { ...state, city : { ...state.city, loading : false, error : action.payload }};

        case GUEST_FETCH_AGE_LIST :
        case USER_FETCH_AGE_LIST :
            return { ...state, age : { list : [], loading : true }};
        case GUEST_FETCH_AGE_LIST_SUCCESS :
        case USER_FETCH_AGE_LIST_SUCCESS :
            return { ...state, age : { list : action.payload, loading : false }};
        case GUEST_FETCH_AGE_LIST_FAILURE :
        case USER_FETCH_AGE_LIST_FAILURE :
            return { ...state, age : { ...state.age, loading : false, error : action.payload }};

        case GUEST_FIND_LOGIN_ID :
            return { ...state, findLoginId : { result : null, loading : true, error : null }};
        case GUEST_FIND_LOGIN_ID_SUCCESS :
            return { ...state, findLoginId : { result : action.payload, loading : false, error : null }};
        case GUEST_FIND_LOGIN_ID_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, findLoginId : { result : action.payload, loading : false, error : error }};
        case RESET_GUEST_FIND_LOGIN_ID :
            return { ...state, findLoginId : { result : null, loading : false, error : null }};

        default :
            return state;
    }
}