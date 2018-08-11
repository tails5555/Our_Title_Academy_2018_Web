import {CreateRequest} from "../component/main_side/create_request_page";
import {connect} from 'react-redux';
import {resetUserSaveRequest} from "../action/action_request";

function mapStateToProps(state){
    return {
        saveStatus : state.request.saveStatus,
        accessUser : state.user.accessUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetCreateRequest : () => dispatch(resetUserSaveRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest);