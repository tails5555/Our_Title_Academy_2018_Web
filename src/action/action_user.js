import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:8080/UserAPI/auth';

export const USER_LOGIN_PROCESS = 'USER_LOGIN_PROCESS';
export const USER_LOGIN_EXCEPTION = 'USER_LOGIN_EXCEPTION';
export const USER_LOGIN_COMPLETE = 'USER_LOGIN_COMPLETE';

export const USER_LOGOUT_PROCESS = 'USER_LOGOUT_PROCESS';

export const FETCH_USER_PRINCIPAL_FROM_SERVER_PROCESS = 'FETCH_USER_PRINCIPAL_FROM_SERVER_PROCESS';
export const FETCH_USER_PRINCIPAL_FROM_SERVER_COMPLETE = 'FETCH_USER_PRINCIPAL_FROM_SERVER_COMPLETE';
export const FETCH_USER_PRINCIPAL_FROM_SERVER_EXCEPTION = 'FETCH_USER_PRINCIPAL_FROM_SERVER_EXCEPTION';
export const RESET_FETCH_USER_PRINCIPAL_FROM_SERVER = 'RESET_FETCH_USER_PRINCIPAL_FROM_SERVER';

export const USER_LOAD_SIGN_FORM = 'USER_LOAD_SIGN_FORM';
export const USER_LOAD_SIGN_FORM_SUCCESS = 'USER_LOAD_SIGN_FORM_SUCCESS';
export const USER_LOAD_SIGN_FORM_FAILURE = 'USER_LOAD_SIGN_FORM_FAILURE';
export const RESET_USER_LOAD_SIGN_FORM = 'RESET_USER_LOAD_SIGN_FORM';

export const USER_LOAD_AGE_LIST = 'USER_LOAD_AGE_LIST';
export const USER_LOAD_AGE_LIST_SUCCESS = 'USER_LOAD_AGE_LIST_SUCCESS';
export const USER_LOAD_AGE_LIST_FAILURE = 'USER_LOAD_AGE_LIST_FAILURE';
export const RESET_USER_LOAD_AGE_LIST = 'RESET_USER_LOAD_AGE_LIST';

export const USER_LOAD_CITY_LIST = 'USER_LOAD_CITY_LIST';
export const USER_LOAD_CITY_LIST_SUCCESS = 'USER_LOAD_CITY_LIST_SUCCESS';
export const USER_LOAD_CITY_LIST_FAILURE = 'USER_LOAD_CITY_LIST_FAILURE';
export const RESET_USER_LOAD_CITY_LIST = 'RESET_USER_LOAD_CITY_LIST';

export const USER_CONFIRM_CURRENT_PASSWORD = 'USER_CONFIRM_CURRENT_PASSWORD';
export const USER_CONFIRM_CURRENT_PASSWORD_SUCCESS = 'USER_CONFIRM_CURRENT_PASSWORD_SUCCESS';
export const USER_CONFIRM_CURRENT_PASSWORD_FAILURE = 'USER_CONFIRM_CURRENT_PASSWORD_FAILURE';
export const RESET_USER_CONFIRM_CURRENT_PASSWORD = 'RESET_USER_CONFIRM_CURRENT_PASSWORD';

export const USER_UPDATE_SIGN_INFO_PROCESS = 'USER_UPDATE_SIGN_INFO_PROCESS';
export const USER_UPDATE_SIGN_INFO_SUCCESS = 'USER_UPDATE_SIGN_INFO_SUCCESS';
export const USER_UPDATE_SIGN_INFO_FAILURE = 'USER_UPDATE_SIGN_INFO_FAILURE';
export const RESET_USER_UPDATE_SIGN_INFO = 'RESET_USER_UPDATE_SIGN_INFO';

export const ADMIN_LOAD_USER_LIST = 'ADMIN_LOAD_USER_LIST';
export const ADMIN_LOAD_USER_LIST_SUCCESS = 'ADMIN_LOAD_USER_LIST_SUCCESS';
export const ADMIN_LOAD_USER_LIST_FAILURE = 'ADMIN_LOAD_USER_LIST_FAILURE';

export const MANAGER_LOAD_USER_LIST = 'MANAGER_LOAD_USER_LIST';
export const MANAGER_LOAD_USER_LIST_SUCCESS = 'MANAGER_LOAD_USER_LIST_SUCCESS';
export const MANAGER_LOAD_USER_LIST_FAILURE = 'MANAGER_LOAD_USER_LIST_FAILURE';

export const RESET_COMMON_LOAD_USER_LIST = 'RESET_COMMON_LOAD_USER_LIST';

export function userLoginProcess(loginForm){
    const request = axios({
        method : 'post',
        url : `${ROOT_URL}/guest/login`,
        data : loginForm
    });
    return {
        type : USER_LOGIN_PROCESS,
        payload : request
    }
}

export function userLoginComplete(userToken){
    const request = axios.get(`${ROOT_URL}/common/current_access`,{
        headers :
            {
                'Authorization' : `Bearer ${userToken}`
            }
        }
    );
    return {
        type : USER_LOGIN_COMPLETE,
        payload : request.then(access => {
            return access.data
        })
    }
}

export function userLoginException(error){
    return {
        type : USER_LOGIN_EXCEPTION,
        payload : error
    }
}

export function userLogoutProcess(userToken){
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
    const request = axios.get(`${ROOT_URL}/common/current_access`,{
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

export function userLoadSignForm(userToken){
    const request = axios.get(`${ROOT_URL}/common/sign_info`, {
            headers :
                {
                    'Authorization' : `Bearer ${userToken}`
                }
        }
    );
    return {
        type : USER_LOAD_SIGN_FORM,
        payload : request
    }
}

export function userLoadSignFormSuccess(signForm){
    return {
        type : USER_LOAD_SIGN_FORM_SUCCESS,
        payload : signForm.data
    }
}

export function userLoadSignFormFailure(error){
    return {
        type : USER_LOAD_SIGN_FORM_FAILURE,
        payload : error
    }
}

export function resetUserLoadSignForm(){
    return {
        type : RESET_USER_LOAD_SIGN_FORM
    }
}

export function userLoadAgeList(userToken){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/common/ageList`,
        headers :
        {
            'Authorization' : `Bearer ${userToken}`
        }
    });
    return {
        type : USER_LOAD_AGE_LIST,
        payload : request
    }
}

export function userLoadAgeListSuccess(cities){
    return {
        type : USER_LOAD_AGE_LIST_SUCCESS,
        payload : cities.data
    }
}

export function userLoadAgeListFailure(error){
    return {
        type : USER_LOAD_AGE_LIST_FAILURE,
        payload : error
    }
}

export function resetUserLoadAgeList(){
    return {
        type : RESET_USER_LOAD_AGE_LIST
    }
}

export function userLoadCityList(userToken){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/common/cityList`,
        headers :
        {
            'Authorization' : `Bearer ${userToken}`
        }
    });
    return {
        type : USER_LOAD_CITY_LIST,
        payload : request
    }
}

export function userLoadCityListSuccess(cities){
    return {
        type : USER_LOAD_CITY_LIST_SUCCESS,
        payload : cities.data
    }
}

export function userLoadCityListFailure(error){
    return {
        type : USER_LOAD_CITY_LIST_FAILURE,
        payload : error
    }
}

export function resetUserLoadCityList(){
    return {
        type : RESET_USER_LOAD_CITY_LIST
    }
}

export function userConfirmCurrentPassword(currentPassword, userToken){
    const request = axios({
        method : 'post',
        url : `${ROOT_URL}/common/confirm_password`,
        data : currentPassword,
        headers :
            {
                'Authorization' : `Bearer ${userToken}`
            }
    });

    return {
        type : USER_CONFIRM_CURRENT_PASSWORD,
        payload : request
    }
}

export function userConfirmCurrentPasswordSuccess(result){
    return {
        type : USER_CONFIRM_CURRENT_PASSWORD_SUCCESS,
        payload : result.data
    }
}

export function userConfirmCurrentPasswordFailure(error){
    return {
        type : USER_CONFIRM_CURRENT_PASSWORD_FAILURE,
        payload : error
    }
}

export function resetUserConfirmCurrentPassword(){
    return {
        type : RESET_USER_CONFIRM_CURRENT_PASSWORD
    }
}

export function userUpdateSignInfoProcess(userInfoUpdateForm, userToken){
    const request = axios({
        method : 'put',
        url : `${ROOT_URL}/common/sign_update`,
        data : userInfoUpdateForm,
        headers :
            {
                'Authorization' : `Bearer ${userToken}`
            }
    });

    return {
        type : USER_UPDATE_SIGN_INFO_PROCESS,
        payload : request
    }
}

export function userUpdateSignInfoSuccess(detailVO){
    return {
        type : USER_UPDATE_SIGN_INFO_SUCCESS,
        payload : detailVO.data
    }
}

export function userUpdateSignInfoFailure(error){
    return {
        type : USER_UPDATE_SIGN_INFO_FAILURE,
        payload : error
    }
}

export function resetUserUpdateSignInfo(){
    return {
        type : RESET_USER_UPDATE_SIGN_INFO
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

