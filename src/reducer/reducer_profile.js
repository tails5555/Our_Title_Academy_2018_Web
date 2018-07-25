import {
    USER_LOAD_MY_PROFILE, USER_LOAD_MY_PROFILE_SUCCESS, USER_LOAD_MY_PROFILE_FAILURE, RESET_USER_LOAD_MY_PROFILE,
    USER_UPLOAD_PROFILE, USER_UPLOAD_PROFILE_SUCCESS, USER_UPLOAD_PROFILE_FAILURE, RESET_USER_UPLOAD_PROFILE,
    USER_RELEASE_PROFILE, USER_RELEASE_PROFILE_SUCCESS, USER_RELEASE_PROFILE_FAILURE, RESET_USER_RELEASE_PROFILE
} from '../action/action_profile';

const INITIAL_STATE = {
    myProfile : { profile : null, loading : false, error : null },
    uploadProfile : { uploadMessage : null, loading : false, uploadError : null },
    releaseProfile : { releaseMessage : null, loading : false, releaseError : null }
}

export default function(state = INITIAL_STATE, action){
    let error;
    switch(action.type) {
        case USER_LOAD_MY_PROFILE :
            return { ...state, myProfile : { profile : null, loading : true, error : null }};
        case USER_LOAD_MY_PROFILE_SUCCESS :
            return { ...state, myProfile : { profile : action.payload, loading : false, error : null }};
        case USER_LOAD_MY_PROFILE_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, myProfile : { profile : null, loading : false, error : error }};
        case RESET_USER_LOAD_MY_PROFILE :
            return { ...state, myProfile : { profile : null, loading : false, error : null }};

        case USER_UPLOAD_PROFILE :
            return { ...state, uploadProfile : { uploadMessage : null, loading : true, uploadError : null }};
        case USER_UPLOAD_PROFILE_SUCCESS :
            return { ...state, uploadProfile : { uploadMessage : action.payload, loading : false, uploadError : null }};
        case USER_UPLOAD_PROFILE_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, uploadProfile : { uploadMessage : null, loading : false, uploadError : error }};
        case RESET_USER_UPLOAD_PROFILE :
            return { ...state, uploadProfile : { uploadMessage : null, loading : false, uploadError : null }};

        case USER_RELEASE_PROFILE :
            return { ...state, releaseProfile : { releaseMessage : null, loading : true, releaseError : null }};
        case USER_RELEASE_PROFILE_SUCCESS :
            return { ...state, releaseProfile : { releaseMessage : action.payload, loading : false, releaseError : null }};
        case USER_RELEASE_PROFILE_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, releaseProfile : { releaseMessage : null, loading : false, releaseError : error }};
        case RESET_USER_RELEASE_PROFILE :
            return { ...state, releaseProfile : { releaseMessage : null, loading : false, releaseError : null }};

        default :
            return state;
    }
}