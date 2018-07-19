import React, {Component} from 'react';
import {renderField, renderSelect} from '../../form';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { withRouter } from 'react-router-dom';
import {guestSignUpProcess, guestSignUpSuccess, guestSignUpFailure} from "../../../action/action_guest";

function validate(values){
    var errors = {};
    var hasErrors = false;

    if(!values.mainPassword || values.mainPassword.trim() === ''){
        errors.mainPassword = '비밀번호를 입력하세요.';
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

    var emailExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
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

const validateAndGuestSign = (values, dispatch, props) => {
    return dispatch(guestSignUpProcess(values)).then(
        (response) => {
            if(response.payload && response.payload.status != 200){
                dispatch(guestSignUpFailure(response.payload));
                throw new SubmissionError(response.payload.data);
            }
            dispatch(guestSignUpSuccess(response.payload));
        }
    )
}

class SignForm extends Component {
    componentWillMount() {
        this.props.fetchAgeFromServer();
        this.props.fetchCityFromServer();
    }

    componentWillUnmount() {
        this.props.resetFetchAgeFromServer();
        this.props.resetFetchCityFromServer();
        this.props.resetConfirmLoginId();
    }

    handleClickConfirm(event){
        let loginId = (this.props.signForm.values === null) || this.props.signForm.values.loginId;
        this.props.fetchConfirmLoginId(loginId);
    }

    handleClickReset(event){
        this.props.resetConfirmLoginId();
        this.props.reset();
    }

    render() {
        const { ages } = this.props.ageElements;
        const { cities } = this.props.cityElements;
        const { result } = this.props.loginIdElement;
        const { detail } = this.props.detailResult;
        const { handleSubmit } = this.props;
        if(detail !== null){
            !this.props.history || this.props.history.push('/account/sign_result');
        }
        return(
            <section>
                <header className="major">
                    <h2>회원 가입</h2>
                </header>
                <div className="w3-panel w3-round-large w3-blue">
                    <h3 className="w3-text-white align-center">회원 가입을 진행하기 위해 아래와 같은 양식을 입력하세요.</h3>
                </div>
                <form onSubmit={handleSubmit(validateAndGuestSign)}>
                    <Field type="text" name="loginId" component={renderField} label="사용자 ID" placeholder="이용할 ID를 입력하세요." readOnly={(result) ? true : false} />
                    <br/>
                    {
                        result ?
                            <div className="w3-panel w3-green w3-round-large">
                                <h3 className="w3-text-white w3-center">회원 가입을 계속 진행할 수 있습니다.</h3>
                            </div> :
                            <div>
                                <button type="button" className="button primary fit large" onClick={this.handleClickConfirm.bind(this)}>중복 확인하기</button>
                                <br/>
                            </div>
                    }
                    <br/>
                    <Field type="password" name="mainPassword" component={renderField} label="비밀번호" placeholder="이용할 비밀번호를 입력하세요." />
                    <br/>
                    <Field type="password" name="subPassword" component={renderField} label="비밀번호 확인" placeholder="비밀번호를 한 번 더 입력하세요." />
                    <br/>
                    <Field type="text" name="name" component={renderField} label="이름" placeholder="본인의 이름을 입력하세요." />
                    <br/>
                    <Field type="text" name="nickname" component={renderField} label="별칭" placeholder="홈페이지에서 쓸 별칭을 입력하세요." />
                    <br/>
                    <Field type="email" name="email" component={renderField} label="E-Mail" placeholder="본인의 E-Mail을 입력하세요." />
                    <br/>
                    <Field type="text" name="phoneNumber" component={renderField} label="휴대폰 번호" placeholder="본인의 휴대폰 전화번호를 입력하세요. ex> 01012345678" />
                    <br/>
                    <Field type="text" name="homeNumber" component={renderField} label="집 전화번호" placeholder="본인의 집 전화번호를 입력하세요. 없으면 비우셔도 됩니다. ex> 03112345678" />
                    <br/>
                    <label>연령</label>
                    <Field name="ageId" component={renderSelect} children={ ages.map((age) => <option key={`age_${age.id}`} value={age.id}>{age.name}</option> )} />
                    <br/>
                    <label>거주 지역</label>
                    <Field name="cityId" component={renderSelect} children={ cities.map((city) => <option key={`city_${city.id}`} value={city.id}>{city.name}</option> )} />
                    <br/>
                    <button type="button" className="button primary fit large" onClick={this.handleClickReset.bind(this)}>다시 작성하기</button>
                    <br/><br/>
                    {
                        !result ?
                            <div className="w3-panel w3-red w3-round-large">
                                <h3 className="w3-text-white w3-center">회원 ID 확인을 다시 부탁드립니다. 중복된 ID가 존재할 수 있습니다.</h3>
                            </div> :
                            <button type="submit" className="button primary fit large">회원 가입 진행</button>
                    }
                </form>
            </section>
        )
    }
}
export default reduxForm({
    form : 'signForm',
    validate
})(withRouter(SignForm));