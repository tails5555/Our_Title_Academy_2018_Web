import axios from 'axios';

const COMMON_ROOT_URL = 'http://127.0.0.1:8081/UserAPI/auth/common/profile';

export const USER_LOAD_MY_PROFILE = 'USER_LOAD_MY_PROFILE';
export const USER_LOAD_MY_PROFILE_SUCCESS = 'USER_LOAD_MY_PROFILE_SUCCESS';
export const USER_LOAD_MY_PROFILE_FAILURE = 'USER_LOAD_MY_PROFILE_FAILURE';
export const RESET_USER_LOAD_MY_PROFILE = 'RESET_USER_LOAD_MY_PROFILE';

export const USER_UPLOAD_PROFILE = 'USER_UPLOAD_PROFILE';
export const USER_UPLOAD_PROFILE_SUCCESS = 'USER_UPLOAD_PROFILE_SUCCESS';
export const USER_UPLOAD_PROFILE_FAILURE = 'USER_UPLOAD_PROFILE_FAILURE';
export const RESET_USER_UPLOAD_PROFILE = 'RESET_USER_UPLOAD_PROFILE';

export const USER_RELEASE_PROFILE = 'USER_RELEASE_PROFILE';
export const USER_RELEASE_PROFILE_SUCCESS = 'USER_RELEASE_PROFILE_SUCCESS';
export const USER_RELEASE_PROFILE_FAILURE = 'USER_RELEASE_PROFILE_FAILURE';
export const RESET_USER_RELEASE_PROFILE = 'RESET_USER_RELEASE_PROFILE';

export function userLoadMyProfile(userToken){
    const request = axios({
        method : 'get',
        url : `${COMMON_ROOT_URL}/my_fetch`,
        headers :
            {
                'Authorization' : `Bearer ${userToken}`
            }
    });
    return {
        type : USER_LOAD_MY_PROFILE,
        payload : request
    }
}

export function userLoadMyProfileSuccess(profileVO){
    return {
        type : USER_LOAD_MY_PROFILE_SUCCESS,
        payload : profileVO.data
    }
}

export function userLoadMyProfileFailure(error){
    return {
        type : USER_LOAD_MY_PROFILE,
        payload : error
    }
}

export function resetUserLoadMyProfile(){
    return {
        type : RESET_USER_LOAD_MY_PROFILE
    }
}

export function userUploadProfile(file, userToken){
    let formData = new FormData();
    formData.append('file', file);
    const request = axios({
        method : 'post',
        url : `${COMMON_ROOT_URL}/upload`,
        data : formData,
        headers : {
            "Content-Type" : "multipart/form-data",
            "Authorization" : `Bearer ${userToken}`
        }
    });
    return{
        type : USER_UPLOAD_PROFILE,
        payload : request
    }
}

export function userUploadProfileSuccess(message){
    return{
        type : USER_UPLOAD_PROFILE_SUCCESS,
        payload : message.data
    }
}

export function userUploadProfileFailure(error){
    return{
        type : USER_UPLOAD_PROFILE_FAILURE,
        payload : error
    }
}

export function resetUserUploadProfile(){
    return{
        type : RESET_USER_UPLOAD_PROFILE
    }
}

export function userReleaseProfile(userToken){
    const request = axios({
        method : 'delete',
        url : `${COMMON_ROOT_URL}/release`,
        headers :
            {
                'Authorization' : `Bearer ${userToken}`
            }
    });

    return {
        type : USER_RELEASE_PROFILE,
        payload : request
    }
}

export function userReleaseProfileSuccess(message){
    return {
        type : USER_RELEASE_PROFILE_SUCCESS,
        payload : message.data
    }
}

export function userReleaseProfileFailure(error){
    return {
        type : USER_RELEASE_PROFILE_FAILURE,
        payload : error
    }
}

export function resetUserReleaseProfile(){
    return {
        type : RESET_USER_RELEASE_PROFILE
    }
}