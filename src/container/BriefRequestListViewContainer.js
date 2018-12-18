import { BriefRequestListView } from "../component/main_side";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CategoryAction from '../action/action_category';
import * as RequestAction from '../action/action_request';

function mapStateToProps(state){
    return {
        category : state.category,
        request : state.request.main,
        options : state.request.options,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        categoryAction : bindActionCreators(CategoryAction, dispatch),
        requestAction : bindActionCreators(RequestAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BriefRequestListView);