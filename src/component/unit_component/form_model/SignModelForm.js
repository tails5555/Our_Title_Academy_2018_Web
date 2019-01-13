import React, { Component, Fragment } from 'react';

import axios from 'axios';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {reduxForm, Field} from 'redux-form';

import * as UserAction from "../../../action/action_user";
import * as GuestAction from "../../../action/action_guest";

import { renderField, renderSelect } from "../../input_render";
import OptionLoadingView from "./OptionLoadingView";
import {ModalScreen} from "../modal";

const guestConfirmURL = 'http://127.0.0.1:8081/UserAPI/auth/guest/user';
const userConfirmURL = 'http://127.0.0.1:8081/UserAPI/auth/common/password';

const validateAndSignSaving = (values, dispatch, { accessor }) => {
    if(!accessor.principal) {
        dispatch(GuestAction.guestExecuteSignUp(values));
    } else {
        dispatch(UserAction.userUpdateMySignInfo(values));
    }
}

const mapStateToProps = ({ detail, guest, user, form }) => {
    const { element } = user.form;
    let signForm = {
        confirmPassword : '',
        mainPassword : '',
        subPassword : '',
        loginId : element && element.loginId,
        name : element && element.name,
        nickname : element && element.nickname,
        email : element && element.email,
        phoneNumber : element && element.phoneNumber,
        homeNumber : element && element.homeNumber,
        ageId : element && element.ageId,
        cityId : element && element.cityId
    }
    return{
        guest : guest.form,
        user : user.form,
        age : detail.age,
        city : detail.city,
        accessor : user.accessor,
        sign : form.signModelForm,
        initialValues : signForm,
    };
}

const mapDispatchToProps = (dispatch) => ({
    guestAction : bindActionCreators(GuestAction, dispatch),
    userAction : bindActionCreators(UserAction, dispatch)
});

function validate(values){
    let errors = {};
    let hasErrors = false;

    const pattern = /^[A-Za-z0-9]{6,12}$/;
    const emailExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
    const phoneExp = /^01([0|1|6|7|8|9]?)?([0-9]{7,8})$/;

    if(!values.mainPassword || values.mainPassword.trim() === ''){
        errors.mainPassword = '비밀번호를 입력하세요.';
        hasErrors = true;
    } else if(!values.mainPassword.match(pattern)){
        errors.mainPassword = '비밀번호도 영어 대-소문자, 숫자를 포함한 6~12자로 입력하세요.';
        hasErrors = true;
    }

    if(!values.subPassword || values.subPassword.trim() === ''){
        errors.subPassword = '비밀번호 확인을 부탁 드립니다.';
        hasErrors = true;
    } else if(values.subPassword !== values.mainPassword){
        errors.subPassword = '비밀번호 확인이 일치하지 않습니다.';
        hasErrors = true;
    }

    if(!values.name || values.name.trim() === ''){
        errors.name = '이름을 입력하세요.';
        hasErrors = true;
    }

    if(!values.nickname || values.nickname.trim() === ''){
        errors.nickname = '별명을 입력하세요.';
        hasErrors = true;
    }

    if(!values.email || values.email.trim() === ''){
        errors.email = '이메일을 입력하세요.';
        hasErrors = true;
    } else if(!values.email.match(emailExp)){
        errors.email = '이메일 형식을 확인하세요.';
        hasErrors = true;
    }

    if(!values.phoneNumber || values.phoneNumber.trim() === ''){
        errors.phoneNumber = '휴대폰 번호를 입력하세요.';
        hasErrors = true;
    } else if(!values.phoneNumber.match(phoneExp)){
        errors.phoneNumber = '휴대폰 번호 형식을 확인하세요.';
        hasErrors = true;
    }

    if(!values.ageId || values.ageId === '0'){
        errors.ageId = '연령을 선택하세요.';
        hasErrors = true;
    }

    if(!values.cityId || values.cityId === '0'){
        errors.cityId = '거주 지역을 선택하세요.';
        hasErrors = true;
    }

    return hasErrors && errors;
}

const commonSignTextFormElements = [
    { type : 'text', name : 'nickname', label : '닉네임', placeholder : '본인 이름 대신 사용할 별명을 입력하세요.', readOnly : false },
    { type : 'text', name : 'email', label : 'E-Mail', placeholder : '본인의 E-Mail을 입력하세요.', readOnly : false },
    { type : 'text', name : 'phoneNumber', label : '휴대폰 번호', placeholder : '본인의 휴대폰 전화번호를 입력하세요. ex> 01012345678', readOnly : false },
    { type : 'text', name : 'homeNumber', label : '집 전화번호', placeholder : '본인의 집 전화번호를 입력하세요. 없으면 비우셔도 됩니다. ex> 03112345678', readOnly : false }
];

const guestSignTextFormElements = [
    { type : 'text', name : 'name', label : '이름', placeholder : '본인의 이름을 입력하세요. 회원 이름은 매니저, 관리자만 열람합니다.', readOnly : false },
    { type : 'text', name : 'loginId', label : '사용자 ID', placeholder : '제목학원에서 사용하실 아이디를 입력하세요. 영어 대-소문자, 숫자를 포함한 6~12자로 입력하세요.', readOnly : false },
    { type : 'password', name : 'mainPassword', label : '비밀번호', placeholder : '이용할 비밀번호를 입력하세요. 영어 대-소문자, 숫자를 포함한 6~12자로 입력하세요.', readOnly : false },
    { type : 'password', name : 'subPassword', label : '비밀번호 확인', placeholder : '비밀번호를 한 번 더 입력하세요.', readOnly : false },
].concat(commonSignTextFormElements);

const userSignTextFormElements = [
    { type : 'text', name : 'loginId', label : '사용자 ID [수정 불가능]', placeholder : '제목학원에서 사용하실 아이디를 입력하세요. 영어 대-소문자, 숫자를 포함한 6~12자로 입력하세요.', readOnly : true },
    { type : 'text', name : 'name', label : '이름 [수정 불가능]', placeholder : '본인의 이름을 입력하세요. 회원 이름은 매니저, 관리자만 열람합니다.', readOnly : true },
    { type : 'password', name : 'confirmPassword', label : '이전 비밀번호', placeholder : '회원 수정을 위한 이전 비밀번호를 입력하세요.', readOnly : false },
    { type : 'password', name : 'mainPassword', label : '새로운 비밀번호', placeholder : '새로 사용할 비밀번호를 입력하세요. 영어 대-소문자, 숫자를 포함한 6~12자로 입력하세요.', readOnly : false },
    { type : 'password', name : 'subPassword', label : '새로운 비밀번호 확인', placeholder : '새로 사용할 비밀번호를 한 번 더 입력하세요.', readOnly : false },
].concat(commonSignTextFormElements);

class SignModelForm extends Component {
    constructor(props){
        super(props);
        this.state = { ages : [], cities : [], ageLoading : false, cityLoading : false, ageError : null, cityError : null, canSubmit : null };
    }

    componentDidMount(){
        const { accessor } = this.props;
        if(accessor.principal) {
            const { userAction } = this.props;
            const { fetchAgeList, fetchCityList, userFetchMySignInfo } = userAction;
            fetchAgeList();
            fetchCityList();
            userFetchMySignInfo();
        } else {
            const { guestAction } = this.props;
            const { fetchAgeList, fetchCityList } = guestAction;
            fetchAgeList();
            fetchCityList();
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { age, city } = nextProps;
        const { ages, cities, ageLoading, cityLoading, ageError, cityError } = prevState;
        if(
            ages !== age.list || cities !== city.list || age.loading !== ageLoading || city.loading !== cityLoading || age.error !== ageError || city.error !== cityError
        ) {
            return {
                ages : age.list, cities : city.list, ageLoading : age.loading, cityLoading : city.loading, ageError : age.error, cityError : city.error
            }
        }
        return null;
    }

    componentDidUpdate(prevState, prevProps){
        const { history, guest, user } = this.props;
        if(guest.complete){
            alert(`${guest.complete && guest.complete.name} 님의 회원 가입 진행이 완료 되었습니다. 홈으로 이동합니다.`);
            history.push('/');
        } else if(guest.error){
            alert(`회원 가입을 하는 도중 데이터베이스 내부에 오류가 발생 했습니다.\n오류 내용 : ${guest.error} 이 문제가 계속 발생하면 개발자에게 조치를 취하시길 바랍니다.`);
            history.push('/');
        }

        if(user.complete){
            alert(`${user.complete && user.complete.name} 님의 회원 수정하는 작업이 완료 되었습니다. 홈으로 이동합니다.`);
            history.push('/');
        } else if(user.error){
            alert(`회원 수정을 하는 도중 데이터베이스 내부에 오류가 발생 했습니다.\n오류 내용 : ${user.error} 이 문제가 계속 발생하면 개발자에게 조치를 취하시길 바랍니다.`);
            history.push('/');
        }
    }

    componentWillUnmount(){
        const { accessor } = this.props;
        if(accessor.principal) {
            const { userAction } = this.props;
            const { resetUserFetchMySignInfo, resetUserUpdateMySignInfo } = userAction;
            resetUserFetchMySignInfo();
            resetUserUpdateMySignInfo();
        } else {
            const { guestAction } = this.props;
            const { resetGuestExecuteSignUp } = guestAction;
            resetGuestExecuteSignUp();
        }
    }

    handleClickValidate = (field) => {
        const loginExp = /^[A-Za-z0-9]{6,12}$/;
        const { sign } = this.props;
        let value = sign.values && sign.values[field];
        if(typeof value === 'string'){
            if(value.trim() !== '' && value.match(loginExp)){
                let request = null;
                if(field === 'loginId') {
                    request = axios({
                        url : `${guestConfirmURL}/${value}`,
                        method : 'get'
                    });
                } else if(field === 'confirmPassword') {
                    request = axios({
                        url : `${userConfirmURL}`,
                        method : 'post',
                        data : value,
                        headers : {
                            'Authorization' : `Bearer ${sessionStorage.getItem('jwtToken')}`
                        }
                    });
                }

                if(request){
                    request.then((response) => {
                        this.setState({
                            canSubmit : response.data
                        });
                    });
                }
            } else {
                if(field === 'loginId')
                    alert('사용자 ID는 영어 대-소문자, 숫자를 포함한 6~12자로 구성해야 합니다.');
                else if(field === 'confirmPassword')
                    alert('비밀번호는 영어 대-소문자, 숫자를 포함한 6~12자로 구성 됩니다.');
            }
        } else {
            if(field === 'loginId')
                alert('사용자 ID를 입력하시고 중복 확인을 받으시길 바랍니다.');
            else if(field === 'confirmPassword')
                alert('비밀번호를 입력하시고 회원 확인을 받으시길 바랍니다.');
        }
    }

    render(){
        const { handleSubmit, accessor, guest, user } = this.props;
        const { ages, cities, ageLoading, cityLoading, canSubmit } = this.state;
        return (
            <Fragment>
                <form onSubmit={handleSubmit(validateAndSignSaving)}>
                    {
                        canSubmit ? (
                            <div className="w3-panel w3-green w3-round-large">
                                <h3 className="w3-text-white w3-center">
                                    <i className="fas fa-check-circle" /> { accessor.principal ? '회원 정보 수정을 계속 진행할 수 있습니다.' : '회원 가입을 계속 진행할 수 있습니다.' }
                                </h3>
                                <h6 className="w3-text-white w3-center">
                                    나머지 양식들을 모두 입력해주시길 바랍니다.
                                </h6>
                            </div>
                        ) : null
                    }
                    {
                        accessor.principal ? userSignTextFormElements.map((field, idx) => (
                            <div key={`user_sign_form_field_${idx}`} style={{ margin : '10px 10px'}}>
                                <Field type={ field.type } name={ field.name } component={renderField} label={ field.label } placeholder={ field.placeholder } readOnly={ (field.name === 'confirmPassword') ? false : !field.readOnly ? !canSubmit : true } />
                                {
                                    (field.name === 'confirmPassword') ? (
                                        <div className="w3-margin">
                                            <button type="button" className="button fit" onClick={() => this.handleClickValidate(field.name)}>
                                                <i className="fas fa-search" /> 비밀번호 확인
                                            </button>
                                        </div>
                                    ) : null
                                }
                            </div>
                        )) : guestSignTextFormElements.map((field, idx) => (
                            <div key={`guest_sign_form_field_${idx}`} style={{ margin : '10px 10px'}}>
                                <Field type={ field.type } name={ field.name } component={renderField} label={ field.label } placeholder={ field.placeholder } readOnly={ (field.name === 'loginId') ? canSubmit : field.readOnly } />
                                {
                                    (field.name === 'loginId') ? (
                                        <div className="w3-margin">
                                            <button type="button" className="button fit" onClick={() => this.handleClickValidate(field.name)}>
                                                <i className="fas fa-search" /> 아이디 중복 확인
                                            </button>
                                        </div>
                                    ) : null
                                }
                            </div>
                        ))
                    }
                    {
                        ageLoading || cityLoading ? (
                            <OptionLoadingView id={"select_options_loading_view"} title={"연령과 거주 지역 정보들을 서버에서 불러오는 중입니다..."} style={{ marginBottom : '20px' }} />
                        ) : (
                            <div>
                                <div id="login_id_field" style={{ margin : '10px 10px'}}>
                                    <label>연령</label>
                                    <Field name="ageId" component={renderSelect} children={ ages.map((age) => <option key={`age_${age.id}`} value={age.id}>{age.name}</option> )} />
                                </div>
                                <div id="login_id_field" style={{ margin : '10px 10px'}}>
                                    <label>거주 지역</label>
                                    <Field name="cityId" component={renderSelect} children={ cities.map((city) => <option key={`city_${city.id}`} value={city.id}>{city.name}</option> )} />
                                </div>
                            </div>
                        )
                    }
                    {
                        !canSubmit ?
                            <div className="w3-panel w3-red w3-round-large">
                                <h3 className="w3-text-white w3-center">회원 ID 확인을 다시 부탁드립니다. 중복된 ID가 존재할 수 있습니다.</h3>
                            </div> :
                            <div className="w3-margin">
                                <button type="submit" className="button primary fit large">
                                    <i className="fas fa-check" /> 작성 완료
                                </button>
                            </div>
                    }
                </form>
                <ModalScreen title="Loading" opened={guest.loading || user.loading}>
                    <div className="w3-center w3-padding">
                        <i className="fas fa-sync fa-spin" style={{ fontSize : '80px', margin : '10px' }} />
                        <h4>회원 서버에 접속하는 중입니다...</h4>
                    </div>
                </ModalScreen>
            </Fragment>
        );
    }
}

SignModelForm = reduxForm({
    form : 'signModelForm',
    validate,
    keepDirtyOnReinitialize : true,
    enableReinitialize : true
})(SignModelForm);

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SignModelForm)
);