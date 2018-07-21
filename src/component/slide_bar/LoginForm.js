import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { renderField } from "../form";
import { userLoginProcess, userLoginComplete, userLoginException } from "../../action/action_user";

function validate(values){
    var errors = {};
    var hasErrors = false;
    if(!values.loginId || values.loginId.trim() === ''){
        errors.loginId = '사용자 ID를 입력하세요.';
        hasErrors = true;
    }
    if(!values.password || values.password.trim() === ''){
        errors.password = '비밀번호를 입력하세요.';
        hasErrors = true;
    }
    return hasErrors && errors;
}

const validateAndUserLogin = (values, dispatch) => {
    return dispatch(userLoginProcess(values)).then(
        (response) => {
            if(response.payload && response.payload.status != 200){
                dispatch(userLoginException(response.payload));
                throw new SubmissionError(response.payload.data);
            }
            localStorage.setItem('jwtToken', response.payload.data);
            dispatch(userLoginComplete(response.payload.data));
        }
    )
}

class LoginForm extends Component {
    render(){
        let loginResult =
            <span className="w3-tag w3-padding w3-round-large w3-blue w3-center">
                제목을 짓고 싶으면 로그인을 해주세요.
            </span>

        const {handleSubmit} = this.props;
        const {loading, error} = this.props.accessUser;
        if(loading){
            loginResult =
                <span className="w3-tag w3-padding w3-round-large w3-blue w3-center">
                    로그인을 진행하고 있습니다...
                </span>
        }
        if(error){
            loginResult =
                <span className="w3-tag w3-padding w3-round-large w3-red w3-center">
                    { error }
                </span>
        }
        return(
            <section id="user_login" className="alt">
                <header className="major">
                    <h2>Login</h2>
                </header>
                <form onSubmit={handleSubmit(validateAndUserLogin)}>
                    <Field name="loginId" type="text" component={renderField} label="사용자 ID" placeholder="ID를 입력하세요." />
                    <br/>
                    <Field name="password" type="password" component={renderField} label="사용자 비밀번호" placeholder="비밀번호를 입력하세요." />
                    <br/>
                    <button type="submit" className="button primary fit large">Login!!!</button>
                </form>
                {loginResult}
            </section>
        )
    }
}
export default reduxForm({
    form : 'loginForm',
    validate
})(LoginForm);