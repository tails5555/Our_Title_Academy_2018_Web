import {FindForm} from "../component/main_side/find_loginId_page";
import {connect} from 'react-redux';
import {resetGuestFindLoginId} from "../action/action_guest";

function mapStateToProps(state){
    return {
        findLoginId : state.detail.findLoginId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetFindLoginId : () => dispatch(resetGuestFindLoginId())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindForm);