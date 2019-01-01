import {
    anybodyFetchOwnerValidRequestApi, anybodyFetchOwnerWaitingRequestApi, anybodyFetchOwnerRequestStatisticApi,
    anybodyFetchOwnerTitleApi, anybodyFetchOwnerTitleStatisticApi
} from "./api/api_owner";

import{
    ANYBODY_FETCH_OWNER_VALID_REQUESTS, ANYBODY_FETCH_OWNER_VALID_REQUESTS_SUCCESS, ANYBODY_FETCH_OWNER_VALID_REQUESTS_FAILURE, RESET_ANYBODY_FETCH_OWNER_VALID_REQUESTS,
    ANYBODY_FETCH_OWNER_WAITING_REQUESTS, ANYBODY_FETCH_OWNER_WAITING_REQUESTS_SUCCESS, ANYBODY_FETCH_OWNER_WAITING_REQUESTS_FAILURE, RESET_ANYBODY_FETCH_OWNER_WAITING_REQUESTS,
    ANYBODY_FETCH_OWNER_REQUEST_STATISTIC, ANYBODY_FETCH_OWNER_REQUEST_STATISTIC_SUCCESS, ANYBODY_FETCH_OWNER_REQUEST_STATISTIC_FAILURE, RESET_ANYBODY_FETCH_OWNER_REQUEST_STATISTIC,
    ANYBODY_FETCH_OWNER_WRITTEN_TITLES, ANYBODY_FETCH_OWNER_WRITTEN_TITLES_SUCCESS, ANYBODY_FETCH_OWNER_WRITTEN_TITLES_FAILURE, RESET_ANYBODY_FETCH_OWNER_WRITTEN_TITLES,
    ANYBODY_FETCH_OWNER_TITLE_STATISTIC, ANYBODY_FETCH_OWNER_TITLE_STATISTIC_SUCCESS, ANYBODY_FETCH_OWNER_TITLE_STATISTIC_FAILURE, RESET_ANYBODY_FETCH_OWNER_TITLE_STATISTIC
} from "./type/type_owner";

const anybodyFetchOwnerVaildRequestsStart = () => ({
    type : ANYBODY_FETCH_OWNER_VALID_REQUESTS
});

const anybodyFetchOwnerValidRequestsSuccess = (response) => ({
    type : ANYBODY_FETCH_OWNER_VALID_REQUESTS_SUCCESS,
    payload : response && response.data
});

const anybodyFetchOwnerValidRequestsFailure = (error) => ({
    type : ANYBODY_FETCH_OWNER_VALID_REQUESTS_FAILURE,
    payload : error && error.message
});

const resetAnybodyFetchOwnerValidRequestsStart = () => ({
    type : RESET_ANYBODY_FETCH_OWNER_VALID_REQUESTS
});

export const fetchOwnerValidRequests = (userId) => (dispatch) => {
    dispatch(anybodyFetchOwnerVaildRequestsStart());

    return anybodyFetchOwnerValidRequestApi(userId).then((response) => {
        setTimeout(() => {
            dispatch(anybodyFetchOwnerValidRequestsSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(anybodyFetchOwnerValidRequestsFailure(error));
    });
}

export const resetFetchOwnerValidRequests = () => (dispatch) => {
    dispatch(resetAnybodyFetchOwnerValidRequestsStart());
}

const anybodyFetchOwnerWaitingRequestsStart = () => ({
    type : ANYBODY_FETCH_OWNER_WAITING_REQUESTS
});

const anybodyFetchOnwerWaitingRequestsSuccess = (response) => ({
    type : ANYBODY_FETCH_OWNER_WAITING_REQUESTS_SUCCESS,
    payload : response && response.data
});

const anybodyFetchOwnerWaitingRequestsFailure = (error) => ({
    type : ANYBODY_FETCH_OWNER_WAITING_REQUESTS_FAILURE,
    payload : error && error.message
});

export const fetchOwnerWaitingRequests = (userId) => (dispatch) => {
    dispatch(anybodyFetchOwnerWaitingRequestsStart());

    return anybodyFetchOwnerWaitingRequestApi(userId).then((response) => {
        setTimeout(() => {
            dispatch(anybodyFetchOnwerWaitingRequestsSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(anybodyFetchOwnerWaitingRequestsFailure(error));
    });
}

const resetAnybodyFetchOwnerWaitingRequestsStart = () => ({
    type : RESET_ANYBODY_FETCH_OWNER_WAITING_REQUESTS
});

export const resetFetchOwnerWaitingRequests = () => (dispatch) => {
    dispatch(resetAnybodyFetchOwnerWaitingRequestsStart());
}

const anybodyFetchOwnerRequestStatisticStart = () => ({
    type : ANYBODY_FETCH_OWNER_REQUEST_STATISTIC
});

const anybodyFetchOwnerRequestStatisticSuccess = (response) => ({
    type : ANYBODY_FETCH_OWNER_REQUEST_STATISTIC_SUCCESS,
    payload : response && response.data
});

const anybodyFetchOwnerRequestStatisticFailure = (error) => ({
    type : ANYBODY_FETCH_OWNER_REQUEST_STATISTIC_FAILURE,
    payload : error && error.message
});

export const fetchOwnerRequestStatistic = (userId) => (dispatch) => {
    dispatch(anybodyFetchOwnerRequestStatisticStart());

    return anybodyFetchOwnerRequestStatisticApi(userId).then((response) => {
        setTimeout(() => {
            dispatch(anybodyFetchOwnerRequestStatisticSuccess(response));
        }, 3000);
    }).catch((error) => {
        dispatch(anybodyFetchOwnerRequestStatisticFailure(error));
    });
}

const resetAnybodyFetchOwnerRequestStatisticStart = () => ({
    type : RESET_ANYBODY_FETCH_OWNER_REQUEST_STATISTIC
});

export const resetFetchOwnerRequestStatistic = () => (dispatch) => {
    dispatch(resetAnybodyFetchOwnerRequestStatisticStart());
}

const anybodyFetchOwnerWrittenTitlesStart = () => ({
    type : ANYBODY_FETCH_OWNER_WRITTEN_TITLES
});

const anybodyFetchOwnerWrittenTitlesSuccess = (response) => ({
    type : ANYBODY_FETCH_OWNER_WRITTEN_TITLES_SUCCESS,
    payload : response && response.data
});

const anybodyFetchOwnerWrittenTitlesFailure = (error) => ({
    type : ANYBODY_FETCH_OWNER_WRITTEN_TITLES_FAILURE,
    payload : error && error.message
});

export const fetchOwnerWrittenTitles = (userId) => (dispatch) => {
    dispatch(anybodyFetchOwnerWrittenTitlesStart());

    return anybodyFetchOwnerTitleApi(userId).then((response) => {
        setTimeout(() => {
            dispatch(anybodyFetchOwnerWrittenTitlesSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(anybodyFetchOwnerWrittenTitlesFailure(error));
    });
}

const resetAnybodyFetchOwnerWrittenTitlesStart = () => ({
    type : RESET_ANYBODY_FETCH_OWNER_WRITTEN_TITLES
});

export const resetFetchOwnerWrittenTitles = () => (dispatch) => {
    dispatch(resetAnybodyFetchOwnerWrittenTitlesStart());
}

const anybodyFetchOwnerTitleStatisticStart = () => ({
    type : ANYBODY_FETCH_OWNER_TITLE_STATISTIC
});

const anybodyFetchOwnerTitleStatistisSuccess = (response) => ({
    type : ANYBODY_FETCH_OWNER_TITLE_STATISTIC_SUCCESS,
    payload : response && response.data
});

const anybodyFetchOwnerTitleStatisticFailure = (error) => ({
    type : ANYBODY_FETCH_OWNER_TITLE_STATISTIC_FAILURE,
    payload : error && error.message
});

export const fetchOwnerTitleStatistic = (userId) => (dispatch) => {
    dispatch(anybodyFetchOwnerTitleStatisticStart());

    return anybodyFetchOwnerTitleStatisticApi(userId).then((response) => {
        setTimeout(() => {
            dispatch(anybodyFetchOwnerTitleStatistisSuccess(response));
        }, 3000);
    }).catch((error) => {
        dispatch(anybodyFetchOwnerTitleStatisticFailure(error));
    });
}

const resetAnybodyFetchOwnerTitleStatisticStart = () => ({
    type : RESET_ANYBODY_FETCH_OWNER_TITLE_STATISTIC
});

export const resetFetchOwnerTitleStatistic = () => (dispatch) => {
    dispatch(resetAnybodyFetchOwnerTitleStatisticStart());
}