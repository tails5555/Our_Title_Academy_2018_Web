import {
    fetchCategoryListApi, fetchCategoryElementApi
} from './api/api_category';
import {
    ANYBODY_FETCH_CATEGORY_LIST, ANYBODY_FETCH_CATEGORY_LIST_SUCCESS, ANYBODY_FETCH_CATEGORY_LIST_FAILURE,
    ANYBODY_FETCH_CATEGORY_ELEMENT, ANYBODY_FETCH_CATEGORY_ELEMENT_SUCCESS, ANYBODY_FETCH_CATEGORY_ELEMENT_FAILURE, RESET_ANYBODY_FETCH_CATEGORY_ELEMENT
} from "./type/type_category";

const fetchCategoryListStart = () => ({
    type : ANYBODY_FETCH_CATEGORY_LIST
});

const fetchCategoryListSuccess = (response) => {
    const { data } = response;
    return {
        type : ANYBODY_FETCH_CATEGORY_LIST_SUCCESS,
        payload : data
    }
}

const fetchCategoryListFailure = (error) => ({
    type : ANYBODY_FETCH_CATEGORY_LIST_FAILURE,
    payload : error && error.message
});

export const fetchCategoryListAction = () => (dispatch) => {
    dispatch(fetchCategoryListStart());

    return fetchCategoryListApi().then((response) => {
        setTimeout(() => {
            dispatch(fetchCategoryListSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(fetchCategoryListFailure(error));
    });
}

const fetchCategoryElementStart = () => ({
    type : ANYBODY_FETCH_CATEGORY_ELEMENT
});

const fetchCategoryElementSuccess = (response) => {
    const { data } = response;
    return {
        type : ANYBODY_FETCH_CATEGORY_ELEMENT_SUCCESS,
        payload : data
    };
}

const fetchCategoryElementFailure = (error) => ({
    type : ANYBODY_FETCH_CATEGORY_ELEMENT_FAILURE,
    payload : error && error.message
});

const resetFetchCategoryElement = () => ({
    type : RESET_ANYBODY_FETCH_CATEGORY_ELEMENT
});

export const fetchCategoryElementAction = (id) => (dispatch) => {
    dispatch(fetchCategoryElementStart());

    return fetchCategoryElementApi(id).then((response) => {
        setTimeout(() => {
            dispatch(fetchCategoryElementSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(fetchCategoryElementFailure(error));
    });
}

export const resetFetchCategoryElementAction = () => (dispatch) => {
    dispatch(resetFetchCategoryElement());
}