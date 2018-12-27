import {
    fetchBriefRankApi, fetchMainRankApi
} from "./api/api_rank";
import {
    ANYBODY_FETCH_BRIEF_RANK_REQUESTS, ANYBODY_FETCH_BRIEF_RANK_REQUESTS_SUCCESS, ANYBODY_FETCH_BRIEF_RANK_REQUESTS_FAILURE, RESET_ANYBODY_FETCH_BRIEF_RANK_REQUESTS,
    ANYBODY_FETCH_MAIN_RANK_REQUESTS, ANYBODY_FETCH_MAIN_RANK_REQUESTS_SUCCESS, ANYBODY_FETCH_MAIN_RANK_REQUESTS_FAILURE, RESET_ANYBODY_FETCH_MAIN_RANK_REQUESTS
} from "./type/type_rank";

const anybodyFetchBriefRankRequestsStart = () => ({
    type : ANYBODY_FETCH_BRIEF_RANK_REQUESTS
});

const anybodyFetchBriefRankRequestsSuccess = (response) => ({
    type : ANYBODY_FETCH_BRIEF_RANK_REQUESTS_SUCCESS,
    payload : response && response.data
});

const anybodyFetchBriefRankRequestsFailure = (error) => ({
    type : ANYBODY_FETCH_BRIEF_RANK_REQUESTS_FAILURE,
    payload : error && error.message
});

export const fetchBriefRankRequests = () => (dispatch) => {
    dispatch(anybodyFetchBriefRankRequestsStart());

    return fetchBriefRankApi().then((response) => {
        setTimeout(() => {
            dispatch(anybodyFetchBriefRankRequestsSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(anybodyFetchBriefRankRequestsFailure(error));
    });
}

const resetAnybodyFetchBriefRankRequestsStart = () => ({
    type : RESET_ANYBODY_FETCH_BRIEF_RANK_REQUESTS
});

export const resetFetchBriefRankRequests = () => (dispatch) => {
    dispatch(resetAnybodyFetchBriefRankRequestsStart());
}

const anybodyFetchMainRankRequestsStart = () => ({
    type : ANYBODY_FETCH_MAIN_RANK_REQUESTS
});

const anybodyFetchMainRankRequestsSuccess = (response) => ({
    type: ANYBODY_FETCH_MAIN_RANK_REQUESTS_SUCCESS,
    payload: response && response.data
});

const anybodyFetchMainRankRequestsFailure = (error) => ({
    type : ANYBODY_FETCH_MAIN_RANK_REQUESTS_FAILURE,
    payload : error && error.message
});

export const fetchMainRankRequests = () => (dispatch) => {
    dispatch(anybodyFetchMainRankRequestsStart());

    return fetchMainRankApi().then((response) => {
        setTimeout(() => {
            dispatch(anybodyFetchMainRankRequestsSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(anybodyFetchMainRankRequestsFailure(error));
    })
}

const resetAnybodyFetchMainRankRequestsStart = () => ({
    type : RESET_ANYBODY_FETCH_MAIN_RANK_REQUESTS
});

export const resetFetchMainRankRequests = () => (dispatch) => {
    dispatch(resetAnybodyFetchMainRankRequestsStart());
}