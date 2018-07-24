import {
    USER_LOAD_MY_PROFILE, USER_LOAD_MY_PROFILE_SUCCESS, USER_LOAD_MY_PROFILE_FAILURE, RESET_USER_LOAD_MY_PROFILE,
    USER_UPLOAD_PROFILE, USER_UPLOAD_PROFILE_SUCCESS, USER_UPLOAD_PROFILE_FAILURE, RESET_USER_UPLOAD_PROFILE
} from '../action/action_profile';

const INITIAL_STATE = {
    myProfile : { profile : null, loading : false, error : null },
    uploadProfile : { message : null, loading : false, error : null}
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
            return { ...state, uploadProfile : { message : null, loading : true, error : null }};
        case USER_UPLOAD_PROFILE_SUCCESS :
            return { ...state, uploadProfile : { message : action.payload, loading : false, error : null }};
        case USER_UPLOAD_PROFILE_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, uploadProfile : { message : null, loading : false, error : error }};
        case RESET_USER_UPLOAD_PROFILE :
            return { ...state, uploadProfile : { message : null, loading : false, error : null }};

        default :
            return state;
    }
}