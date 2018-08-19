import { UserInfo } from "../component/slide_bar";
import { connect } from 'react-redux';
import { userLogoutProcess } from '../action/action_user';
import { userLoadMyProfile, userLoadMyProfileSuccess, userLoadMyProfileFailure, resetUserLoadMyProfile } from "../action/action_profile";

const mapDispatchToProps = (dispatch) => {
    return{
        fetchProfileFromServer : () => {
            let accessToken = sessionStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            dispatch(userLoadMyProfile(accessToken)).then((response) => {
                if(!response.error){
                    dispatch(userLoadMyProfileSuccess(response.payload));
                } else {
                    dispatch(userLoadMyProfileFailure(response.payload));
                }
            })
        },
        logoutFromServer : () => {
            let accessToken = sessionStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            dispatch(userLogoutProcess(accessToken));
        },
        resetFetchProfile : () => {
            dispatch(resetUserLoadMyProfile());
        }
    }
}

function mapStateToProps(state){
    return {
        accessUser : state.user.accessUser,
        myProfile : state.profile.myProfile
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);