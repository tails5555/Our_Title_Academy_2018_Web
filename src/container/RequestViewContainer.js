import {connect} from 'react-redux';
import {RequestView} from "../component/main_side/request_page";
import {
    appFetchViewRequestMain, appFetchViewRequestMainSuccess, appFetchViewRequestMainFailure, resetAppFetchViewRequestMain
} from "../action/action_request";

function mapStateToProps(state){
    return {
        selectRequest : state.request.selectRequest,
        bestTitles : state.request.bestTitles
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSelectRequest : (id) => {
            dispatch(appFetchViewRequestMain(id)).then((response) => {
                if(!response.error){
                    dispatch(appFetchViewRequestMainSuccess(response.payload));
                }else{
                    dispatch(appFetchViewRequestMainFailure(response.payload));
                }
            })
        },
        resetFetchSelectRequest : () => dispatch(resetAppFetchViewRequestMain())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestView);