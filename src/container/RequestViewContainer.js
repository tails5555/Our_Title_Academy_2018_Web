import {connect} from 'react-redux';
import {RequestView} from "../component/main_side/request_page";
import {
    appFetchViewRequestMain, appFetchViewRequestMainSuccess, appFetchViewRequestMainFailure,
    resetAppFetchViewRequestMain, managerExecuteBlockingRequestFailure, managerExecuteBlockingRequestSuccess,
    managerExecuteBlockingRequest, resetManagerExecuteBlockingRequest
} from "../action/action_request";
import {
    appFetchMainTitleList, appFetchMainTitleListSuccess, appFetchMainTitleListFailure, resetAppFetchMainTitleList,
    appFetchUserHasTitle, appFetchUserHasTitleSuccess, appFetchUserHasTitleFailure, resetAppFetchUserHasTitle
} from "../action/action_title";

function mapStateToProps(state){
    return {
        selectRequest : state.request.selectRequest,
        bestTitles : state.request.bestTitles,
        accessUser : state.user.accessUser,
        titleList : state.title.titleList,
        hasTitle : state.title.hasTitle,
        blockStatus : state.request.blockStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
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
        resetExecuteBlockRequest : () => dispatch(resetManagerExecuteBlockingRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestView);