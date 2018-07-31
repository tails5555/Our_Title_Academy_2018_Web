import {
    APP_LOAD_CATEGORIES, APP_LOAD_CATEGORIES_SUCCESS, APP_LOAD_CATEGORIES_FAILURE, RESET_APP_LOAD_CATEGORIES,
    APP_SELECT_CATEGORY, APP_SELECT_CATEGORY_SUCCESS, APP_SELECT_CATEGORY_FAILURE, RESET_APP_SELECT_CATEGORY
} from "../action/action_category";

const INITIAL_STATE = {
    menuCategories : { categories : [], loading : false, error : null },
    selectCategory : { category : null, loading : false, error : null }
}

export default function(state = INITIAL_STATE, action){
    let error;
    switch(action.type){
        case APP_LOAD_CATEGORIES :
            return { ...state, menuCategories : { categories : [], loading : true, error : null}};
        case APP_LOAD_CATEGORIES_SUCCESS :
            return { ...state, menuCategories : { categories : action.payload, loading : false, error : null }};
        case APP_LOAD_CATEGORIES_FAILURE :
            error = error = action.payload || { message : action.payload };
            return { ...state, menuCategories : { categories : [], loading : false, error : error }};
        case RESET_APP_LOAD_CATEGORIES :
            return { ...state, menuCategories : { categories : [], loading : false, error : null }};

        case APP_SELECT_CATEGORY :
            return { ...state, selectCategory : { category : null, loading : true, error : null }};
        case APP_SELECT_CATEGORY_SUCCESS :
            return { ...state, selectCategory : { category : action.payload, loading : false, error : null }};
        case APP_SELECT_CATEGORY_FAILURE :
            error = error = action.payload || { message : action.payload };
            return { ...state, selectCategory : { category : null, loading : false, error : null }};
        case RESET_APP_SELECT_CATEGORY :
            return { ...state, selectCategory : { category : null, loading : false, error : null }};

        default :
            return state;
    }
}