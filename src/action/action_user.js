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
