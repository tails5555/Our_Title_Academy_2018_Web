import axios from 'axios';
import JWTDecode from 'jwt-decode';

const ROOT_URL = 'http://127.0.0.1:8080/UserAPI/auth';

export const USER_LOGIN_PROCESS = 'USER_LOGIN_PROCESS';
export const USER_LOGIN_EXCEPTION = 'USER_LOGIN_EXCEPTION';
export const USER_LOGIN_COMPLETE = 'USER_LOGIN_COMPLETE';
export const RESET_USER_LOGIN = 'RESET_USER_LOGIN';

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
    const accessInfo = axios.get(`${ROOT_URL}/common/current_access`,{
        headers :
            {
                'Authorization' : `Bearer ${userToken}`
            }
        }
    );
    return {
        type : USER_LOGIN_COMPLETE,
        payload : accessInfo.then(accessVO => {
            return accessVO
        })
    }
}

export function userLoginException(error){
    return {
        type : USER_LOGIN_EXCEPTION,
        payload : error
    }
}

export function resetUserLogin(){
    return {
        type : RESET_USER_LOGIN
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
        payload : access
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
