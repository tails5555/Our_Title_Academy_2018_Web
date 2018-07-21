import React, {Component} from 'react';
import { reduxForm, Field, SubmissionError  } from 'redux-form';
import { renderField, renderSelect } from "../../form";
import { withRouter } from 'react-router-dom';
import {userUpdateSignInfoProcess, userUpdateSignInfoSuccess, userUpdateSignInfoFailure} from "../../../action/action_user";
function validate(values){
    var errors = {};
    var hasErrors = false;

    if(!values.mainPassword || values.mainPassword.trim() === ''){
        errors.mainPassword = '새로운 비밀번호를 입력하세요.';
        hasErrors = true;
    }

    if(!values.subPassword || values.subPassword.trim() === ''){
        errors.subPassword = '새로운 비밀번호 확인을 부탁 드립니다.';
        hasErrors = true;
    } else if(values.subPassword !== values.mainPassword){
        errors.subPassword = '새로운 비밀번호 확인이 일치하지 않습니다.';
        hasErrors = true;
    }

    if(!values.nickname || values.nickname.trim() === ''){
        errors.nickname = '별명을 입력하세요.';
        hasErrors = true;
    }

    var emailExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
    if(!values.email || values.email.trim() === ''){
        errors.email = '이메일을 입력하세요.';
        hasErrors = true;
    } else if(!values.email.match(emailExp)){
        errors.email = '이메일 형식을 확인하세요.';
        hasErrors = true;
    }

    var phoneExp = /^01([0|1|6|7|8|9]?)?([0-9]{7,8})$/;

    if(!values.phoneNumber || values.phoneNumber.trim() === ''){
        errors.phoneNumber = '휴대폰 번호를 입력하세요.';
        hasErrors = true;
    } else if(!values.phoneNumber.match(phoneExp)){
        errors.phoneNumber = '휴대폰 번호 형식을 확인하세요.';
        hasErrors = true;
    }

    if(!values.ageId || values.ageId === 0){
        errors.ageId = '연령을 선택하세요.';
        hasErrors = true;
    }

    if(!values.cityId || values.cityId === 0){
        errors.cityId = '거주 지역을 선택하세요.';
        hasErrors = true;
    }

    return hasErrors && errors;
}

const validateAndUserInfoUpdate = (values, dispatch) => {
    let userInfoUpdateForm = {
        mainPassword : (values === null) ? '' : (values.mainPassword === undefined) ? '' : values.mainPassword,
        subPassword : (values === null) ? '' : (values.subPassword === undefined) ? '' : values.subPassword,
        loginId : (values === null) ? '' : (values.loginId === undefined) ? '' : values.loginId,
        name : (values === null) ? '' : (values.name === undefined) ? '' : values.name,
        nickname : (values === null) ? '' : (values.nickname === undefined) ? '' : values.nickname,
        email : (values === null) ? '' : (values.email === undefined) ? '' : values.email,
        phoneNumber : (values === null) ? '' : (values.phoneNumber === undefined) ? '' : values.phoneNumber,
        homeNumber : (values === null) ? '' : (values.homeNumber === undefined) ? '' : values.homeNumber,
        ageId : (values === null) ? '' : (values.ageId === undefined) ? 0 : values.ageId,
        cityId : (values === null) ? '' : (values.cityId === undefined) ? 0 : values.cityId
    };

    let accessToken = localStorage.getItem('jwtToken');
    if(!accessToken || accessToken === '') return;

    return dispatch(userUpdateSignInfoProcess(userInfoUpdateForm, accessToken)).then(
        (response) => {
            if(response.payload && response.payload.status != 200){
                dispatch(userUpdateSignInfoFailure(response.payload));
                throw new SubmissionError(response.payload.data);
            }
            dispatch(userUpdateSignInfoSuccess(response.payload));
        }
    )
}

class MyInfoForm extends Component{
    componentWillMount() {
        this.props.fetchSignInfoFromServer();
        this.props.fetchAgeFromServer();
        this.props.fetchCityFromServer();
    }

    componentWillUnmount() {
        this.props.resetFetchSignInfoFromServer();
        this.props.resetFetchAgeFromServer();
        this.props.resetFetchCityFromServer();
        this.props.resetFetchConfirmPassword();
    }

    handleClickConfirm(event){
        var pattern = /^[A-Za-z0-9]{6,12}$/;
        let password = !(this.props.userInfoUpdateForm.values) ? '' : this.props.userInfoUpdateForm.values.confirmPassword;
        if(!password || password.trim() !== '') {
            if(password.match(pattern)){
                this.props.fetchConfirmPassword(password);
            }else{
                this.props.userInfoUpdateForm.syncErrors.confirmPassword = '비밀번호는 영어 대-소문자, 숫자를 포함한 6~12자로 구성해야 합니다.';
            }
        }
    }

    render(){
        const { result } = this.props.passwordElement;
        const { ages } = this.props.ageElements;
        const { cities } = this.props.cityElements;
        const { handleSubmit } = this.props;
        const { detail } = this.props.detailResult;
        if(detail !== null){
            !(this.props.history) || this.props.history.push('/my/info_update_result');
        }
        return (
            <section>
                <header className="major">
                    <h2>회원 정보 수정</h2>
                </header>
                <div className="w3-panel w3-round-large w3-blue">
                    <h3 className="w3-text-white align-center">회원 수정을 진행합니다. 다만 이름과 사용자 ID를 변경할 수 없습니다.</h3>
                </div>
                <form onSubmit={handleSubmit(validateAndUserInfoUpdate)}>
                    <Field type="text" name="loginId" component={renderField} label="사용자 ID (수정 불가능)" readOnly={true} />
                    <br/>
                    <Field type="password" name="confirmPassword" component={renderField} label="이전 비밀번호" placeholder="현재 비밀번호를 입력하세요." />
                    <br/>
                    {
                        result ?
                            <div className="w3-panel w3-green w3-round-large">
                                <h3 className="w3-text-white w3-center">회원 수정을 계속 진행할 수 있습니다.</h3>
                            </div> :
                            <div>
                                <button type="button" className="button primary fit large" onClick={this.handleClickConfirm.bind(this)}>현재 비밀번호 확인하기</button>
                                <br/>
                            </div>
                    }
                    <br/>
                    <Field type="password" name="mainPassword" component={renderField} label="비밀번호" placeholder="새로 이용할 비밀번호를 입력하세요." readOnly={!result} />
                    <br/>
                    <Field type="password" name="subPassword" component={renderField} label="비밀번호 확인" placeholder="새로 비밀번호를 한 번 더 입력하세요." readOnly={!result} />
                    <br/>
                    <Field type="text" name="name" component={renderField} label="이름 (수정 불가능)" placeholder="본인의 이름을 입력하세요." readOnly={true} />
                    <br/>
                    <Field type="text" name="nickname" component={renderField} label="별칭" placeholder="홈페이지에서 쓸 별칭을 입력하세요." readOnly={!result} />
                    <br/>
                    <Field type="email" name="email" component={renderField} label="E-Mail" placeholder="본인의 E-Mail을 입력하세요." readOnly={!result} />
                    <br/>
                    <Field type="text" name="phoneNumber" component={renderField} label="휴대폰 번호" placeholder="본인의 휴대폰 전화번호를 입력하세요. ex> 01012345678" readOnly={!result} />
                    <br/>
                    <Field type="text" name="homeNumber" component={renderField} label="집 전화번호" placeholder="본인의 집 전화번호를 입력하세요. 없으면 비우셔도 됩니다. ex> 03112345678" readOnly={!result} />
                    <br/>
                    {
                        result ?
                        <div>
                            <label>연령</label>
                            <Field name="ageId" component={renderSelect} children={ ages.map((age) => <option key={`age_${age.id}`} value={age.id}>{age.name}</option> )} />
                            <br/>
                            <label>거주 지역</label>
                            <Field name="cityId" component={renderSelect} children={ cities.map((city) => <option key={`city_${city.id}`} value={city.id}>{city.name}</option> )} />
                            <br/>
                        </div>
                         : <br/>
                    }
                    <br/>
                    {
                        !result ?
                            <div className="w3-panel w3-red w3-round-large">
                                <h3 className="w3-text-white w3-center">회원 비밀번호를 확인 부탁드립니다. 비밀번호를 확인한 후 수정이 가능합니다.</h3>
                            </div> :
                            <button type="submit" className="button primary fit large">회원 정보 수정</button>
                    }
                </form>
            </section>
        )
    }
}

export default reduxForm({
    form : 'userInfoUpdateForm',
    enableReinitialize : true,
    validate
})(withRouter(MyInfoForm));