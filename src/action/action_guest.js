import axios from 'axios';
const ROOT_URL = 'http://127.0.0.1:8081/UserAPI/auth';

export const GUEST_LOAD_AGE_LIST = 'GUEST_LOAD_AGE_LIST';
export const GUEST_LOAD_AGE_LIST_SUCCESS = 'GUEST_LOAD_AGE_LIST_SUCCESS';
export const GUEST_LOAD_AGE_LIST_FAILURE = 'GUEST_LOAD_AGE_LIST_FAILURE';
export const RESET_GUEST_LOAD_AGE_LIST = 'RESET_GUEST_LOAD_AGE_LIST';

export const GUEST_LOAD_CITY_LIST = 'GUEST_LOAD_CITY_LIST';
export const GUEST_LOAD_CITY_LIST_SUCCESS = 'GUEST_LOAD_CITY_LIST_SUCCESS';
export const GUEST_LOAD_CITY_LIST_FAILURE = 'GUEST_LOAD_CITY_LIST_FAILURE';
export const RESET_GUEST_LOAD_CITY_LIST = 'RESET_GUEST_LOAD_CITY_LIST';

export const GUEST_CONFIRM_LOGIN_ID = 'GUEST_CONFIRM_LOGIN_ID';
export const GUEST_CONFIRM_LOGIN_ID_SUCCESS = 'GUEST_CONFIRM_LOGIN_ID_SUCCESS';
export const GUEST_CONFIRM_LOGIN_ID_FAILURE = 'GUEST_CONFIRM_LOGIN_ID_FAILURE';
export const RESET_GUEST_CONFIRM_LOGIN_ID = 'RESET_GUEST_CONFIRM_LOGIN_ID';

export const GUEST_SIGN_UP_PROCESS = 'GUEST_SIGN_UP_PROCESS';
export const GUEST_SIGN_UP_SUCCESS = 'GUEST_SIGN_UP_SUCCESS';
export const GUEST_SIGN_UP_FAILURE = 'GUEST_SIGN_UP_FAILURE';

export function guestLoadAgeList(){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/guest/ageList`
    });
    return {
        type : GUEST_LOAD_AGE_LIST,
        payload : request
    }
}

export function guestLoadAgeListSuccess(cities){
    return {
        type : GUEST_LOAD_AGE_LIST_SUCCESS,
        payload : cities.data
    }
}

export function guestLoadAgeListFailure(error){
    return {
        type : GUEST_LOAD_AGE_LIST_FAILURE,
        payload : error
    }
}

export function resetGuestLoadAgeList(){
    return {
        type : RESET_GUEST_LOAD_AGE_LIST
    }
}

export function guestLoadCityList(){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/guest/cityList`
    });
    return {
        type : GUEST_LOAD_CITY_LIST,
        payload : request
    }
}

export function guestLoadCityListSuccess(cities){
    return {
        type : GUEST_LOAD_CITY_LIST_SUCCESS,
        payload : cities.data
    }
}

export function guestLoadCityListFailure(error){
    return {
        type : GUEST_LOAD_CITY_LIST_FAILURE,
        payload : error
    }
}

export function resetGuestLoadCityList(){
    return {
        type : RESET_GUEST_LOAD_CITY_LIST
    }
}

export function guestConfirmLoginId(loginId){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/guest/id_confirm/${loginId}`
    });
    return {
        type : GUEST_CONFIRM_LOGIN_ID,
        payload : request
    }
}

export function guestConfirmLoginIdSuccess(result){
    return {
        type : GUEST_CONFIRM_LOGIN_ID_SUCCESS,
        payload : result.data
    }
}

export function guestConfirmLoginIdFailure(error){
    return {
        type : GUEST_CONFIRM_LOGIN_ID_FAILURE,
        payload : error
    }
}

export function resetGuestConfirmLoginId(){
    return {
        type : RESET_GUEST_CONFIRM_LOGIN_ID
    }
}

export function guestSignUpProcess(signForm){
    const request = axios({
        method : 'post',
        url : `${ROOT_URL}/guest/sign_up`,
        data : signForm
    });
    return {
        type : GUEST_SIGN_UP_PROCESS,
        payload : request
    }
}

export function guestSignUpSuccess(detailVO){
    return {
        type : GUEST_SIGN_UP_SUCCESS,
        payload : detailVO.data
    }
}

export function guestSignUpFailure(error){
    return {
        type : GUEST_SIGN_UP_FAILURE,
        payload : error
    }
}