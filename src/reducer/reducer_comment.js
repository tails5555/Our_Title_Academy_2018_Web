import {
    ANYBODY_FETCH_COMMENT_LIST, ANYBODY_FETCH_COMMENT_LIST_SUCCESS, ANYBODY_FETCH_COMMENT_LIST_FAILURE, RESET_ANYBODY_FETCH_COMMENT_LIST,
    ANYBODY_SAVE_COMMENT_BY_MODEL, ANYBODY_SAVE_COMMENT_BY_MODEL_SUCCESS, ANYBODY_SAVE_COMMENT_BY_MODEL_FAILURE,
    ANYBODY_DELETE_COMMENT_BY_ID, ANYBODY_DELETE_COMMENT_BY_ID_SUCCESS, ANYBODY_DELETE_COMMENT_BY_ID_FAILURE, RESET_ANYBODY_SAVE_COMMENT_BY_MODEL
} from "../action/type/type_comment";

const INITIAL_STATE = {
    main : { list : [], loading : false, error : null, type : null },
    form : { complete : null, loading : false, error : null, type : null }
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ANYBODY_FETCH_COMMENT_LIST :
            return { ...state, main : { list : [], loading : true }};
        case ANYBODY_FETCH_COMMENT_LIST_SUCCESS :
            return { ...state, main : { list : action.payload, loading : false }};
        case ANYBODY_FETCH_COMMENT_LIST_FAILURE :
            return { ...state, main : { loading : false, error : action.payload }};
        case RESET_ANYBODY_FETCH_COMMENT_LIST :
            return { ...state, main : { list : [], error : null }};

        case ANYBODY_SAVE_COMMENT_BY_MODEL :
            return { ...state, form : { complete : null, loading : true, type : 'SAVING' }};
        case ANYBODY_SAVE_COMMENT_BY_MODEL_SUCCESS :
            return { ...state, form : { complete : action.payload, loading : false, type : 'SAVING' }};
        case ANYBODY_SAVE_COMMENT_BY_MODEL_FAILURE :
            return { ...state, form : { loading : false, error : action.payload, type : 'SAVING' }};

        case ANYBODY_DELETE_COMMENT_BY_ID :
            return { ...state, form : { complete : null, loading : true, type : 'DELETE' }};
        case ANYBODY_DELETE_COMMENT_BY_ID_SUCCESS :
            return { ...state, form : { complete : action.payload, loading : false, type : 'DELETE' }};
        case ANYBODY_DELETE_COMMENT_BY_ID_FAILURE :
            return { ...state, form : { loading : false, error : action.payload, type : 'DELETE' }};

        case RESET_ANYBODY_SAVE_COMMENT_BY_MODEL :
            return { ...state, form : { error : null, complete : null, type : null }};

        default :
            return state;
    }
}