import axios from 'axios';

import {
    guestLoginApi, guestFetchAgeListApi, guestFetchCityListApi, guestExecuteSignUpApi
} from "./api/api_guest";

import {
    GUEST_EXECUTE_LOGIN_BY_MODEL, GUEST_EXECUTE_LOGIN_BY_MODEL_SUCCESS, GUEST_EXECUTE_LOGIN_BY_MODEL_FAILURE, RESET_GUEST_EXECUTE_LOGIN_BY_MODEL,
    GUEST_FETCH_AGE_LIST, GUEST_FETCH_AGE_LIST_SUCCESS, GUEST_FETCH_AGE_LIST_FAILURE,
    GUEST_FETCH_CITY_LIST, GUEST_FETCH_CITY_LIST_SUCCESS, GUEST_FETCH_CITY_LIST_FAILURE,
    GUEST_EXECUTE_SIGN_UP_BY_MODEL, GUEST_EXECUTE_SIGN_UP_BY_MODEL_SUCCESS, GUEST_EXECUTE_SIGN_UP_BY_MODEL_FAILURE, RESET_GUEST_EXECUTE_SIGN_UP_BY_MODEL
} from "./type/type_guest";

const executeLoginByModelStart = () => ({
    type : GUEST_EXECUTE_LOGIN_BY_MODEL
});

const executeLoginByModelSuccess = (response) => ({
    type : GUEST_EXECUTE_LOGIN_BY_MODEL_SUCCESS,
    payload : response && response.status
});

const executeLoginByModelFailure = (error) => ({
    type : GUEST_EXECUTE_LOGIN_BY_MODEL_FAILURE,
    payload : error && error.data
});

export const executeLoginByModel = (loginModel) => (dispatch) => {
    dispatch(executeLoginByModelStart());

    return guestLoginApi(loginModel).then((response) => {
        if(response && response.status === 200)
            sessionStorage.setItem('jwtToken', response && response.data);
        setTimeout(() => {
            dispatch(executeLoginByModelSuccess(response));
        }, 3000);
    }).catch((error) => {
        const { response } = error;
        setTimeout(() => {
            dispatch(executeLoginByModelFailure(response));
        }, 1500);
    });
}

const resetExecuteLoginByModelStart = () => ({
    type : RESET_GUEST_EXECUTE_LOGIN_BY_MODEL
});

export const resetExecuteLoginByModel = () => (dispatch) => {
    dispatch(resetExecuteLoginByModelStart());
}

const guestFetchAgeListStart = () => ({
    type : GUEST_FETCH_AGE_LIST
});

const guestFetchAgeListSuccess = (response) => ({
    type : GUEST_FETCH_AGE_LIST_SUCCESS,
    payload : response && response.data
});

const guestFetchAgeListFailure = (error) => ({
    type : GUEST_FETCH_AGE_LIST_FAILURE,
    payload : error && error.message
});

export const fetchAgeList = () => (dispatch) => {
    dispatch(guestFetchAgeListStart());

    return guestFetchAgeListApi().then((response) => {
        setTimeout(() => {
            dispatch(guestFetchAgeListSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(guestFetchAgeListFailure(error));
    });
}

const guestFetchCityListStart = () => ({
    type : GUEST_FETCH_CITY_LIST
});

const guestFetchCityListSuccess = (response) => ({
    type : GUEST_FETCH_CITY_LIST_SUCCESS,
    payload : response && response.data
});

const guestFetchCityListFailure = (error) => ({
    type : GUEST_FETCH_CITY_LIST_FAILURE,
    payload : error && error.message
});

export const fetchCityList = () => (dispatch) => {
    dispatch(guestFetchCityListStart());

    return guestFetchCityListApi().then((response) => {
        setTimeout(() => {
            dispatch(guestFetchCityListSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(guestFetchCityListFailure(error));
    });
}

const guestExecuteSignUpStart = () => ({
    type : GUEST_EXECUTE_SIGN_UP_BY_MODEL
});

const guestExecuteSignUpSuccess = (response) => ({
    type : GUEST_EXECUTE_SIGN_UP_BY_MODEL_SUCCESS,
    payload : response && response.data
});

const guestExecuteSignUpFailure = (error) => ({
    type : GUEST_EXECUTE_SIGN_UP_BY_MODEL_FAILURE,
    payload : error && error.message
});

export const guestExecuteSignUp = (signModel) => (dispatch) => {
    dispatch(guestExecuteSignUpStart());

    return guestExecuteSignUpApi(signModel).then((response) => {
        setTimeout(() => {
            dispatch(guestExecuteSignUpSuccess(response));
        }, 3000);
    }).catch((error) => {
        dispatch(guestExecuteSignUpFailure(error));
    });
}

const resetGuestExecuteSignUpStart = () => ({
    type : RESET_GUEST_EXECUTE_SIGN_UP_BY_MODEL
});

export const resetGuestExecuteSignUp = () => (dispatch) => {
    dispatch(resetGuestExecuteSignUpStart());
}

const ROOT_URL = 'http://127.0.0.1:8081/UserAPI/auth';

export const GUEST_FIND_LOGIN_ID = 'GUEST_FIND_LOGIN_ID';
export const GUEST_FIND_LOGIN_ID_SUCCESS = 'GUEST_FIND_LOGIN_ID_SUCCESS';
export const GUEST_FIND_LOGIN_ID_FAILURE = 'GUEST_FIND_LOGIN_ID_FAILURE';
export const RESET_GUEST_FIND_LOGIN_ID = 'RESET_GUEST_FIND_LOGIN_ID';

export function guestFindLoginId(findModel){
    const request = axios({
        method : 'post',
        url : `${ROOT_URL}/guest/find_loginId`,
        data : findModel
    });

    return {
        type : GUEST_FIND_LOGIN_ID,
        payload : request
    }
}

export function guestFindLoginIdSuccess(result){
    return {
        type : GUEST_FIND_LOGIN_ID_SUCCESS,
        payload : result.data
    }
}

export function guestFindLoginIdFailure(error) {
    return {
        type : GUEST_FIND_LOGIN_ID_FAILURE,
        payload : error
    }
}

export function resetGuestFindLoginId(){
    return {
        type : RESET_GUEST_FIND_LOGIN_ID
    }
}