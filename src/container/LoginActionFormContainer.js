import { LoginActionForm } from "../component/unit_component/form_model";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as GuestAction from '../action/action_guest';

const mapStateToProps = ({ guest }) => ({
    guest : guest.form
});

const mapDispatchToProps = (dispatch) => ({
    guestAction : bindActionCreators(GuestAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginActionForm);