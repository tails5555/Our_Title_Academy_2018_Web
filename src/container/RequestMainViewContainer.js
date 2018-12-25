import { RequestMainView } from "../component/main_side";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RequestAction from '../action/action_request';
import * as TitleAction from '../action/action_title';

import {
    appFetchViewRequestMain, appFetchViewRequestMainSuccess, appFetchViewRequestMainFailure,
    resetAppFetchViewRequestMain, managerExecuteBlockingRequestFailure, managerExecuteBlockingRequestSuccess,
    managerExecuteBlockingRequest, resetManagerExecuteBlockingRequest, resetUserSaveRequest, userSaveRequest,
    userSaveRequestSuccess, userSaveRequestFailure, executeUserDeleteRequest, executeUserDeleteRequestSuccess, executeUserDeleteRequestFailure, resetExecuteUserDeleteRequest
} from "../action/action_request";
import {
    appFetchMainTitleList, appFetchMainTitleListSuccess, appFetchMainTitleListFailure, resetAppFetchMainTitleList,
    appFetchUserHasTitle, appFetchUserHasTitleSuccess, appFetchUserHasTitleFailure, resetAppFetchUserHasTitle
} from "../action/action_title";

function mapStateToProps(state){
    return {
        request : state.request.main,
        title : state.title.main,
        selectRequest : state.request.selectRequest,
        bestTitles : state.request.bestTitles,
        accessUser : state.user.accessUser,
        titleList : state.title.titleList,
        hasTitle : state.title.hasTitle,
        blockStatus : state.request.blockStatus,
        saveStatus : state.request.saveStatus,
        deleteStatus : state.request.deleteStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestAction : bindActionCreators(RequestAction, dispatch),
        titleAction : bindActionCreators(TitleAction, dispatch),
        fetchSelectRequest : (id, userId) => {
            dispatch(appFetchViewRequestMain(id, userId)).then((response) => {
                if(!response.error){
                    dispatch(appFetchViewRequestMainSuccess(response.payload));
                }else{
                    dispatch(appFetchViewRequestMainFailure(response.payload));
                }
            })
        },
        resetFetchSelectRequest : () => dispatch(resetAppFetchViewRequestMain()),
        fetchTitleList : (requestId, userId) => {
            dispatch(appFetchMainTitleList(requestId, userId)).then((response) => {
                if(!response.error){
                    dispatch(appFetchMainTitleListSuccess(response.payload));
                }else{
                    dispatch(appFetchMainTitleListFailure(response.payload));
                }
            })
        },
        resetFetchTitleList : () => dispatch(resetAppFetchMainTitleList()),
        fetchHasTitle : (requestId, userId) => {
            dispatch(appFetchUserHasTitle(requestId, userId)).then((response) => {
                if(!response.error){
                    dispatch(appFetchUserHasTitleSuccess(response.payload));
                }else{
                    dispatch(appFetchUserHasTitleFailure(response.payload));
                }
            })
        },
        resetFetchHasTitle : () => dispatch(resetAppFetchUserHasTitle()),
        executeBlockRequest : (id) => {
            dispatch(managerExecuteBlockingRequest(id)).then((response) => {
                if(!response.error){
                    dispatch(managerExecuteBlockingRequestSuccess(response.payload));
                }else{
                    dispatch(managerExecuteBlockingRequestFailure(response.payload));
                }
            })
        },
        resetExecuteBlockRequest : () => dispatch(resetManagerExecuteBlockingRequest()),
        userUpdateRequest : (requestModel) => dispatch(userSaveRequest(requestModel, null)).then((response) => {
            if(!response.error){
                dispatch(userSaveRequestSuccess(response.payload));
            }else{
                dispatch(userSaveRequestFailure(response.payload));
            }
        }),
        resetUserUpdateRequest : () => dispatch(resetUserSaveRequest()),
        userDeleteRequest : (requestId) => dispatch(executeUserDeleteRequest(requestId)).then((response) => {
            if(!response.error){
                dispatch(executeUserDeleteRequestSuccess(response.payload));
            }else{
                dispatch(executeUserDeleteRequestFailure(response.payload));
            }
        }),
        resetUserDeleteRequest : () => dispatch(resetExecuteUserDeleteRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestMainView);