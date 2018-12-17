import {WarmRequestList} from "../component/main_side/index_page";
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as RequestAction from "../action/action_request";

function mapStateToProps(state){
    return {
        request : state.request.main
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestAction : bindActionCreators(RequestAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WarmRequestList);