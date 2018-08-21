import {TitleManage} from "../component/main_side/title_manage";
import {connect} from 'react-redux';
import {
    adminExecuteDeleteTitlePartition, adminExecuteDeleteTitlePartitionFailure, adminExecuteDeleteTitlePartitionSuccess,
    appFetchAllTitleList, appFetchAllTitleListFailure, appFetchAllTitleListSuccess,
    resetAdminExecuteDeleteTitlePartition,
    resetAppFetchAllTitle
} from "../action/action_title";

function mapStateToProps(state){
    return {
        titleList : state.title.titleList,
        deleteStatus : state.title.deleteStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllTitleList : () => dispatch(appFetchAllTitleList()).then(response => {
            if(!response.error){
                dispatch(appFetchAllTitleListSuccess(response.payload));
            }else{
                dispatch(appFetchAllTitleListFailure(response.payload));
            }
        }),
        resetFetchAllTitleList : () => dispatch(resetAppFetchAllTitle()),
        executePartitionDelete : (titleIds) => dispatch(adminExecuteDeleteTitlePartition(titleIds)).then(response => {
            if(!response.error){
                dispatch(adminExecuteDeleteTitlePartitionSuccess(response.payload));
            }else{
                dispatch(adminExecuteDeleteTitlePartitionFailure(response.payload));
            }
        }),
        resetExecutePartitionDelete : () => dispatch(resetAdminExecuteDeleteTitlePartition())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TitleManage);