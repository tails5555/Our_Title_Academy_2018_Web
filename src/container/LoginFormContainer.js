import {LoginForm} from '../component/slide_bar';
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {
        accessUser : state.user.accessUser
    };
}

export default connect(mapStateToProps, null)(LoginForm);