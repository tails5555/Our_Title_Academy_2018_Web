import {RequestManage} from "../component/main_side/request_manage";
import {connect} from 'react-redux';
import {
    appFetchAllRequestBrief, appFetchAllRequestBriefFailure,
    appFetchAllRequestBriefSuccess, resetAppFetchAllRequestBrief,
    adminExecuteDeleteRequestPartition, adminExecuteDeleteRequestPartitionSuccess, adminExecuteDeleteRequestPartitionFailure, resetAdminExecuteDeleteRequestPartition
} from "../action/action_request";

function mapStateToProps(state){
    return {
        requestList : state.request.requestList,
        deleteStatus : state.request.deleteStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllTitleList : () => dispatch(appFetchAllRequestBrief()).then(response => {
            if(!response.error){
                dispatch(appFetchAllRequestBriefSuccess(response.payload));
            }else{
                dispatch(appFetchAllRequestBriefFailure(response.payload));
            }
        }),
        resetFetchAllTitleList : () => dispatch(resetAppFetchAllRequestBrief()),
        executePartitionDelete : (requestIds) => dispatch(adminExecuteDeleteRequestPartition(requestIds)).then(response => {
            if(!response.error){
                dispatch(adminExecuteDeleteRequestPartitionSuccess(response.payload));
            }else{
                dispatch(adminExecuteDeleteRequestPartitionFailure(response.payload));
            }
        }),
        resetExecutePartitionDelete : () => dispatch(resetAdminExecuteDeleteRequestPartition())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestManage);