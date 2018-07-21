import { UserInfo } from "../component/slide_bar";
import { connect } from 'react-redux';
import { userLogoutProcess } from '../action/action_user';
const mapDispatchToProps = (dispatch) => {
    return{
        logoutFromServer : () => {
            let accessToken = localStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            localStorage.removeItem('jwtToken');
            dispatch(userLogoutProcess(accessToken));
        }
    }
}

function mapStateToProps(state){
    return {
        accessUser : state.user.accessUser
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);