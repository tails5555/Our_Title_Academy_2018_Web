import axios from 'axios';
import JWTDecode from 'jwt-decode';

const ROOT_URL = 'http://127.0.0.1:8080/UserAPI/auth';

export const USER_LOGIN_PROCESS = 'USER_LOGIN_PROCESS';
export const USER_LOGIN_EXCEPTION = 'USER_LOGIN_EXCEPTION';
export const USER_LOGIN_COMPLETE = 'USER_LOGIN_COMPLETE';
export const RESET_USER_LOGIN = 'RESET_USER_LOGIN';

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

