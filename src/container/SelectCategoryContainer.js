import {SelectCategory} from "../component/main_side/photo_agree_page";
import {connect} from 'react-redux';
import {
    appFetchViewRequestMain, appFetchViewRequestMainFailure, appFetchViewRequestMainSuccess,
    managerExecuteBlockingRequest, managerExecuteBlockingRequestFailure, managerExecuteBlockingRequestSuccess,
    resetAppFetchViewRequestMain, resetManagerExecuteFetchRequest
} from "../action/action_request";

function mapStateToProps(state){
    return {
        accessUser : state.user.accessUser,
        menuCategories : state.category.menuCategories,
        selectRequest : state.request.selectRequest,
        agreeStatus : state.request.agreeStatus,
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
        resetExecuteFetchRequest : () => dispatch(resetManagerExecuteFetchRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCategory);