import {SignForm} from "../component/main_side/sign_page";
import {connect} from 'react-redux';
import {
    guestLoadAgeList, guestLoadAgeListSuccess, guestLoadAgeListFailure, resetGuestLoadAgeList,
    guestLoadCityList, guestLoadCityListSuccess, guestLoadCityListFailure, resetGuestLoadCityist,
    guestConfirmLoginId, guestConfirmLoginIdSuccess, guestConfirmLoginIdFailure, resetGuestConfirmLoginId
} from "../action/action_guest";

function mapStateToProps(state){
    return {
        cityElements : state.detail.cityElements,
        ageElements : state.detail.ageElements,
        loginIdElement : state.detail.loginIdElement,
        detailResult : state.detail.detailResult,
        signForm : state.form.signForm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAgeFromServer : () => {
            dispatch(guestLoadAgeList()).then((response) => {
                if(!response.error){
                    dispatch(guestLoadAgeListSuccess(response.payload));
                }else{
                    dispatch(guestLoadAgeListFailure(response.payload));
                }
            })
        },
        resetFetchAgeFromServer : () => {
            dispatch(resetGuestLoadAgeList());
        },
        fetchCityFromServer : () => {
            dispatch(guestLoadCityList()).then((response) => {
                if(!response.error){
                    dispatch(guestLoadCityListSuccess(response.payload));
                }else{
                    dispatch(guestLoadCityListFailure(response.payload));
                }
            })
        },
        resetFetchCityFromServer : () => {
            dispatch(resetGuestLoadCityist());
        },
        fetchConfirmLoginId : (loginId) => {
            dispatch(guestConfirmLoginId(loginId)).then((response) => {
                if(!response.error){
                    dispatch(guestConfirmLoginIdSuccess(response.payload));
                }else{
                    dispatch(guestConfirmLoginIdFailure(response.payload));
                }
            })
        },
        resetConfirmLoginId : () => {
            dispatch(resetGuestConfirmLoginId());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignForm);