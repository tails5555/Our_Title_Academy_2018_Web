import axios from 'axios';

import {
    userFetchMyInfoApi, userFetchAgeListApi, userFetchCityListApi, userUpdateSignInfoApi
} from "./api/api_user";

import {
    USER_FETCH_MY_SIGN_INFO, USER_FETCH_MY_SIGN_INFO_SUCCESS, USER_FETCH_MY_SIGN_INFO_FAILURE, RESET_USER_FETCH_MY_SIGN_INFO,
    USER_FETCH_AGE_LIST, USER_FETCH_AGE_LIST_SUCCESS, USER_FETCH_AGE_LIST_FAILURE,
    USER_FETCH_CITY_LIST, USER_FETCH_CITY_LIST_SUCCESS, USER_FETCH_CITY_LIST_FAILURE,
    USER_UPDATE_MY_SIGN_INFO, USER_UPDATE_MY_SIGN_INFO_SUCCESS, USER_UPDATE_MY_SIGN_INFO_FAILURE, RESET_USER_UPDATE_MY_SIGN_INFO
} from "./type/type_user";

const userFetchMySignInfoStart = () => ({
    type : USER_FETCH_MY_SIGN_INFO
});

const userFetchMySignInfoSuccess = (response) => ({
    type : USER_FETCH_MY_SIGN_INFO_SUCCESS,
    payload : response && response.data
});

const userFetchMySignInfoFailure = (error) => ({
    type : USER_FETCH_MY_SIGN_INFO_FAILURE,
    payload : error && error.message
});

export const userFetchMySignInfo = () => (dispatch) => {
    dispatch(userFetchMySignInfoStart());

    return userFetchMyInfoApi().then((response) => {
        setTimeout(() => {
            dispatch(userFetchMySignInfoSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(userFetchMySignInfoFailure(error));
    });
}

const resetUserFetchMySignInfoStart = () => ({
    type : RESET_USER_FETCH_MY_SIGN_INFO
});

export const resetUserFetchMySignInfo = () => (dispatch) => {
    dispatch(resetUserFetchMySignInfoStart())
}

const userFetchAgeListStart = () => ({
    type : USER_FETCH_AGE_LIST
});

const userFetchAgeListSuccess = (response) => ({
    type : USER_FETCH_AGE_LIST_SUCCESS,
    payload : response && response.data
});

const userFetchAgeListFailure = (error) => ({
    type : USER_FETCH_AGE_LIST_FAILURE,
    payload : error && error.message
});

export const fetchAgeList = () => (dispatch) => {
    dispatch(userFetchAgeListStart());

    return userFetchAgeListApi().then((response) => {
        setTimeout(() => {
            dispatch(userFetchAgeListSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(userFetchAgeListFailure(error));
    });
}

const userFetchCityListStart = () => ({
    type : USER_FETCH_CITY_LIST
});

const userFetchCityListSuccess = (response) => ({
    type : USER_FETCH_CITY_LIST_SUCCESS,
    payload : response && response.data
});

const userFetchCityListFailure = (error) => ({
    type : USER_FETCH_CITY_LIST_FAILURE,
    payload : error && error.message
});

export const fetchCityList = () => (dispatch) => {
    dispatch(userFetchCityListStart());

    return userFetchCityListApi().then((response) => {
        setTimeout(() => {
            dispatch(userFetchCityListSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(userFetchCityListFailure(error));
    });
}

const userUpdateMySignInfoStart = () => ({
    type : USER_UPDATE_MY_SIGN_INFO
});

const userUpdateMySignInfoSuccess = (response) => ({
    type : USER_UPDATE_MY_SIGN_INFO_SUCCESS,
    payload : response && response.data
});

const userUpdateMySignInfoFailure = (error) => ({
    type : USER_UPDATE_MY_SIGN_INFO_FAILURE,
    payload : error && error.message
});

export const userUpdateMySignInfo = (signModel) => (dispatch) => {
    dispatch(userUpdateMySignInfoStart());

    return userUpdateSignInfoApi(signModel).then((response) => {
        setTimeout(() => {
            dispatch(userUpdateMySignInfoSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(userUpdateMySignInfoFailure(error));
    })
}

const resetUserUpdateMySignInfoStart = () => ({
    type : RESET_USER_UPDATE_MY_SIGN_INFO
});

export const resetUserUpdateMySignInfo = () => (dispatch) => {
    dispatch(resetUserUpdateMySignInfoStart());
}


const ROOT_URL = 'http://127.0.0.1:8081/UserAPI/auth';

export const USER_LOGOUT_PROCESS = 'USER_LOGOUT_PROCESS';

export const FETCH_USER_PRINCIPAL_FROM_SERVER_PROCESS = 'FETCH_USER_PRINCIPAL_FROM_SERVER_PROCESS';
export const FETCH_USER_PRINCIPAL_FROM_SERVER_COMPLETE = 'FETCH_USER_PRINCIPAL_FROM_SERVER_COMPLETE';
export const FETCH_USER_PRINCIPAL_FROM_SERVER_EXCEPTION = 'FETCH_USER_PRINCIPAL_FROM_SERVER_EXCEPTION';
export const RESET_FETCH_USER_PRINCIPAL_FROM_SERVER = 'RESET_FETCH_USER_PRINCIPAL_FROM_SERVER';

export const ADMIN_LOAD_USER_LIST = 'ADMIN_LOAD_USER_LIST';
export const ADMIN_LOAD_USER_LIST_SUCCESS = 'ADMIN_LOAD_USER_LIST_SUCCESS';
export const ADMIN_LOAD_USER_LIST_FAILURE = 'ADMIN_LOAD_USER_LIST_FAILURE';

export const MANAGER_LOAD_USER_LIST = 'MANAGER_LOAD_USER_LIST';
export const MANAGER_LOAD_USER_LIST_SUCCESS = 'MANAGER_LOAD_USER_LIST_SUCCESS';
export const MANAGER_LOAD_USER_LIST_FAILURE = 'MANAGER_LOAD_USER_LIST_FAILURE';

export const RESET_COMMON_LOAD_USER_LIST = 'RESET_COMMON_LOAD_USER_LIST';

export const ADMIN_LOAD_USER_INFO = 'ADMIN_LOAD_USER_INFO';
export const ADMIN_LOAD_USER_INFO_SUCCESS = 'ADMIN_LOAD_USER_INFO_SUCCESS';
export const ADMIN_LOAD_USER_INFO_FAILURE = 'ADMIN_LOAD_USER_INFO_FAILURE';

export const MANAGER_LOAD_USER_INFO = 'MANAGER_LOAD_USER_INFO';
export const MANAGER_LOAD_USER_INFO_SUCCESS = 'MANAGER_LOAD_USER_INFO_SUCCESS';
export const MANAGER_LOAD_USER_INFO_FAILURE = 'MANAGER_LOAD_USER_INFO_FAILURE';

export const RESET_COMMON_LOAD_USER_INFO = 'RESET_COMMON_LOAD_USER_INFO';

export function userLogoutProcess(userToken){
    sessionStorage.removeItem('jwtToken');
    const request = axios.delete(`${ROOT_URL}/common/logout`, {
        headers:
            {
                'Authorization': `Bearer ${userToken}`
            }
        }
    );
    return {
        type : USER_LOGOUT_PROCESS,
        payload : request
    }
}

export function fetchUserPrincipalFromServerProcess(userToken){
    const request = axios.get(`${ROOT_URL}/common/accessor`, {
        headers :
            {
                'Authorization' : `Bearer ${userToken}`
            }
        }
    );
    return {
        type : FETCH_USER_PRINCIPAL_FROM_SERVER_PROCESS,
        payload : request
    }
}

export function fetchUserPrincipalFromServerComplete(access){
    return {
        type : FETCH_USER_PRINCIPAL_FROM_SERVER_COMPLETE,
        payload : access.data
    }
}

export function fetchUserPrincipalFromServerException(error){
    return {
        type : FETCH_USER_PRINCIPAL_FROM_SERVER_EXCEPTION,
        payload : error
    }
}

export function resetFetchUserPrincipalFromServer(){
    return {
        type : RESET_FETCH_USER_PRINCIPAL_FROM_SERVER
    }
}

export function adminLoadUserList(userToken){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/admin/user_list`,
        headers :
            {
                'Authorization' : `Bearer ${userToken}`
            }
    });
    return {
        type : ADMIN_LOAD_USER_LIST,
        payload : request
    }
}

export function adminLoadUserListSuccess(userList){
    return {
        type : ADMIN_LOAD_USER_LIST_SUCCESS,
        payload : userList.data
    }
}

export function adminLoadUserListFailure(error){
    return {
        type : ADMIN_LOAD_USER_LIST_FAILURE,
        payload : error
    }
}

export function managerLoadUserList(userToken){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/manager/user_list`,
        headers :
            {
                'Authorization' : `Bearer ${userToken}`
            }
    });
    return {
        type : MANAGER_LOAD_USER_LIST,
        payload : request
    }
}

export function managerLoadUserListSuccess(userList){
    return {
        type : MANAGER_LOAD_USER_LIST_SUCCESS,
        payload : userList.data
    }
}

export function managerLoadUserListFailure(error){
    return {
        type : MANAGER_LOAD_USER_LIST_FAILURE,
        payload : error
    }
}

export function resetCommonLoadUserList(){
    return {
        type : RESET_COMMON_LOAD_USER_LIST
    }
}

export function adminLoadUserInfo(userToken, loginId){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/admin/user_info/${loginId}`,
        headers :
            {
                'Authorization' : `Bearer ${userToken}`
            }
    });
    return {
        type : ADMIN_LOAD_USER_INFO,
        payload : request
    }
}

export function adminLoadUserInfoSuccess(detailVO){
    return {
        type : ADMIN_LOAD_USER_INFO_SUCCESS,
        payload : detailVO.data
    }
}

export function adminLoadUserInfoFailure(error){
    return {
        type : ADMIN_LOAD_USER_INFO_FAILURE,
        payload : error
    }
}

export function managerLoadUserInfo(userToken, loginId){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/manager/user_info/${loginId}`,
        headers :
            {
                'Authorization' : `Bearer ${userToken}`
            }
    });
    return {
        type : MANAGER_LOAD_USER_INFO,
        payload : request
    }
}
export function managerLoadUserInfoSuccess(detail){
    return {
        type : MANAGER_LOAD_USER_INFO_SUCCESS,
        payload : detail.data
    }
}

export function managerLoadUserInfoFailure(error){
    return {
        type : MANAGER_LOAD_USER_INFO_FAILURE,
        payload : error
    }
}

export function resetCommonLoadUserInfo(){
    return {
        type : RESET_COMMON_LOAD_USER_INFO
    }
}
