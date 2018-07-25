import {connect} from 'react-redux';
import {MyProfileChange} from '../component/main_side/my_profile_change';
import {
    resetUserUploadProfile, userReleaseProfile, userReleaseProfileSuccess, userReleaseProfileFailure, resetUserReleaseProfile
} from "../action/action_profile";

function mapStateToProps(state){
    return {
        uploadProfile : state.profile.uploadProfile,
        releaseProfile : state.profile.releaseProfile
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        resetUploadProfile : () => dispatch(resetUserUploadProfile()),
        resetReleaseProfile : () => dispatch(resetUserReleaseProfile()),
        releaseCurrentUserProfile : () => {
            let accessToken = localStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            dispatch(userReleaseProfile(accessToken)).then((response) => {
                if(!response.error){
                    dispatch(userReleaseProfileSuccess(response.payload));
                }else{
                    dispatch(userReleaseProfileFailure(response.payload));
                }
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileChange);