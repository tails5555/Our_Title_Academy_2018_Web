import {
    ANYBODY_FETCH_SEARCH_RESULT, ANYBODY_FETCH_SEARCH_RESULT_SUCCESS, ANYBODY_FETCH_SEARCH_RESULT_FAILURE, RESET_ANYBODY_FETCH_SEARCH_RESULT
} from './type/type_search';

import {
    totalSearchContextApi
} from './api/api_search';

const anybodyFetchSearchResultStart = () => ({
    type : ANYBODY_FETCH_SEARCH_RESULT
});

const anybodyFetchSearchResultSuccess = (response) => ({
    type : ANYBODY_FETCH_SEARCH_RESULT_SUCCESS,
    payload : response && response.data
});

const anybodyFetchSearchResultFailure = (error) => ({
    type : ANYBODY_FETCH_SEARCH_RESULT_FAILURE,
    payload : error && error.message
});

export const fetchTotalSearchResult = (keyword) => (dispatch) => {
    dispatch(anybodyFetchSearchResultStart());

    return totalSearchContextApi(keyword).then((response) => {
        setTimeout(() => {
            dispatch(anybodyFetchSearchResultSuccess(response));
        }, 4000);
    }).catch((error) => {
        dispatch(anybodyFetchSearchResultFailure(error));
    });
}

const resetAnybodyFetchSearchResult = () => ({
    type : RESET_ANYBODY_FETCH_SEARCH_RESULT
});

export const resetFetchTotalSearchResult = () => (dispatch) => {
    dispatch(resetAnybodyFetchSearchResult());
}