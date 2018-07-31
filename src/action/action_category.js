import axios from 'axios';
const ROOT_URL = 'http://127.0.0.1:8082/ContextAPI/category';

export const APP_LOAD_CATEGORIES = 'APP_LOAD_CATEGORIES';
export const APP_LOAD_CATEGORIES_SUCCESS = 'APP_LOAD_CATEGORIES_SUCCESS';
export const APP_LOAD_CATEGORIES_FAILURE = 'APP_LOAD_CATEGORIES_FAILURE';
export const RESET_APP_LOAD_CATEGORIES = 'RESET_APP_LOAD_CATEGORIES';

export const APP_SELECT_CATEGORY = 'APP_SELECT_CATEGORY';
export const APP_SELECT_CATEGORY_SUCCESS = 'APP_SELECT_CATEGORY_SUCCESS';
export const APP_SELECT_CATEGORY_FAILURE = 'APP_SELECT_CATEGORY_FAILURE';
export const RESET_APP_SELECT_CATEGORY = 'RESET_APP_SELECT_CATEGORY';

export function appLoadCategories(){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/list`
    })
    return {
        type : APP_LOAD_CATEGORIES,
        payload : request
    }
}

export function appLoadCategoriesSuccess(categories){
    return {
        type : APP_LOAD_CATEGORIES_SUCCESS,
        payload : categories.data
    }
}

export function appLoadCategoriesFailure(error){
    return {
        type : APP_LOAD_CATEGORIES_FAILURE,
        payload : error
    }
}

export function resetAppLoadCategories(){
    return {
        type : RESET_APP_LOAD_CATEGORIES
    }
}

export function appSelectCategory(id){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/find/${id}`
    })
    return {
        type : APP_SELECT_CATEGORY,
        payload : request
    }
}

export function appSelectCategorySuccess(category){
    return {
        type : APP_SELECT_CATEGORY_SUCCESS,
        payload : category.data
    }
}

export function appSelectCategoryFailure(error){
    return {
        type : APP_SELECT_CATEGORY_FAILURE,
        payload : error
    }
}

export function resetAppSelectCategory(){
    return {
        type : RESET_APP_SELECT_CATEGORY
    }
}