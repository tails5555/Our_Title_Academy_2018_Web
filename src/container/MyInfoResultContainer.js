import {MyInfoResult} from "../component/main_side/my_info_page";
import {connect} from 'react-redux';
import {resetUserUpdateSignInfo} from "../action/action_user";

function mapStateToProps(state){
    return {
        detailResult : state.user.detailResult
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetFetchUpdateResult : () => {
            dispatch(resetUserUpdateSignInfo());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInfoResult);