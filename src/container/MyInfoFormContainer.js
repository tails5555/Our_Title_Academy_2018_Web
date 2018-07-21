import {MyInfoForm} from "../component/main_side/my_info_page";
import {connect} from 'react-redux';
import {
    userLoadSignForm, userLoadSignFormSuccess, userLoadSignFormFailure, resetUserLoadSignForm,
    userLoadAgeList, userLoadAgeListSuccess, userLoadAgeListFailure, resetUserLoadAgeList,
    userLoadCityList, userLoadCityListSuccess, userLoadCityListFailure, resetUserLoadCityList,
    userConfirmCurrentPassword, userConfirmCurrentPasswordSuccess, userConfirmCurrentPasswordFailure, resetUserConfirmCurrentPassword
} from "../action/action_user";

function mapStateToProps(state){
    const { signModel } = state.user.signInfo;
    let userInfoUpdateForm = {
        confirmPassword : '',
        mainPassword : '',
        subPassword : '',
        loginId : (signModel === null) ? '' : (signModel.loginId === undefined) ? '' : signModel.loginId,
        name : (signModel === null) ? '' : (signModel.name === undefined) ? '' : signModel.name,
        nickname : (signModel === null) ? '' : (signModel.nickname === undefined) ? '' : signModel.nickname,
        email : (signModel === null) ? '' : (signModel.email === undefined) ? '' : signModel.email,
        phoneNumber : (signModel === null) ? '' : (signModel.phoneNumber === undefined) ? '' : signModel.phoneNumber,
        homeNumber : (signModel === null) ? '' : (signModel.homeNumber === undefined) ? '' : signModel.homeNumber,
        ageId : (signModel === null) ? '' : (signModel.ageId === undefined) ? 0 : signModel.ageId,
        cityId : (signModel === null) ? '' : (signModel.cityId === undefined) ? 0 : signModel.cityId
    }
    return {
        initialValues : userInfoUpdateForm,
        userInfoUpdateForm : state.form.userInfoUpdateForm,
        detailResult : state.user.detailResult,
        ageElements : state.user.ageElements,
        cityElements : state.user.cityElements,
        passwordElement : state.user.passwordElement
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAgeFromServer : () => {
            let accessToken = localStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            dispatch(userLoadAgeList(accessToken)).then((response) => {
                if(!response.error){
                    dispatch(userLoadAgeListSuccess(response.payload));
                }else{
                    dispatch(userLoadAgeListFailure(response.payload));
                }
            });
        },
        resetFetchAgeFromServer : () => {
            dispatch(resetUserLoadAgeList());
        },
        fetchCityFromServer : () => {
            let accessToken = localStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            dispatch(userLoadCityList(accessToken)).then((response) => {
                if(!response.error){
                    dispatch(userLoadCityListSuccess(response.payload));
                }else{
                    dispatch(userLoadCityListFailure(response.payload));
                }
            })
        },
        resetFetchCityFromServer : () => {
            dispatch(resetUserLoadCityList());
        },
        fetchSignInfoFromServer : () => {
            let accessToken = localStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            dispatch(userLoadSignForm(accessToken)).then((response) => {
                if(!response.error){
                    dispatch(userLoadSignFormSuccess(response.payload));
                }else{
                    dispatch(userLoadSignFormFailure(response.payload));
                }
            })
        },
        resetFetchSignInfoFromServer : () => {
            dispatch(resetUserLoadSignForm());
        },
        fetchConfirmPassword : (password) => {
            let accessToken = localStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            dispatch(userConfirmCurrentPassword(password, accessToken)).then((response) => {
                if(!response.error){
                    dispatch(userConfirmCurrentPasswordSuccess(response.payload));
                }else{
                    dispatch(userConfirmCurrentPasswordFailure(response.payload));
                }
            })
        },
        resetFetchConfirmPassword : () => {
            dispatch(resetUserConfirmCurrentPassword());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInfoForm);