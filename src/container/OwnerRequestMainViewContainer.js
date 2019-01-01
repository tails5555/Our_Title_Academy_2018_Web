import { OwnerRequestMainView } from "../component/main_side";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as OwnerAction from '../action/action_owner';

const mapStateToProps = (state) => ({
    accessUser : state.user.accessUser,
    request : state.owner.request,
    statistic : state.owner.statistic
});

const mapDispatchToProps = (dispatch) => ({
    ownerAction : bindActionCreators(OwnerAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(OwnerRequestMainView);