import {CreateRequest} from "../component/main_side/create_request_page";
import {connect} from 'react-redux';
import {resetUserCreateRequest} from "../action/action_request";

function mapStateToProps(state){
    return {
        createStatus : state.request.createStatus,
        accessUser : state.user.accessUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetCreateRequest : () => dispatch(resetUserCreateRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest);