import {
    ANYBODY_FETCH_CATEGORY_LIST, ANYBODY_FETCH_CATEGORY_LIST_SUCCESS, ANYBODY_FETCH_CATEGORY_LIST_FAILURE,
    ANYBODY_FETCH_CATEGORY_ELEMENT, ANYBODY_FETCH_CATEGORY_ELEMENT_SUCCESS, ANYBODY_FETCH_CATEGORY_ELEMENT_FAILURE, RESET_ANYBODY_FETCH_CATEGORY_ELEMENT
} from "../action/type/type_category";

const INITIAL_STATE = {
    list : [], element : null, loading : false, error : null, status : 0, type : null
}

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case ANYBODY_FETCH_CATEGORY_LIST :
            return { ...state, loading : true };
        case ANYBODY_FETCH_CATEGORY_LIST_SUCCESS :
            return { ...state, loading : false, list : action.payload };
        case ANYBODY_FETCH_CATEGORY_LIST_FAILURE :
            return { ...state, loading : false, error : action.payload };

        case ANYBODY_FETCH_CATEGORY_ELEMENT :
            return { ...state, loading : true, type : 'FETCH' };
        case ANYBODY_FETCH_CATEGORY_ELEMENT_SUCCESS :
            return { ...state, loading : false, element : action.payload };
        case ANYBODY_FETCH_CATEGORY_ELEMENT_FAILURE :
            return { ...state, loading : false, error : action.payload };
        case RESET_ANYBODY_FETCH_CATEGORY_ELEMENT :
            return { ...state, element : null, error : null, type : null };

        default :
            return state;
    }
}