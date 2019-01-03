import { RequestAgreeView } from '../component/main_side';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RequestAction from '../action/action_request';

const mapStateToProps = ({ request }) => ({
    request : request.main
});

const mapDispatchToProps = (dispatch) => ({
    requestAction : bindActionCreators(RequestAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestAgreeView);