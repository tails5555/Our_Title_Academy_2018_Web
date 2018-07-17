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
            sessionStorage.setItem('jwtToken', response.payload.data);
            dispatch(userLoginComplete(response.payload.data));
        }
    )
}

class LoginForm extends Component{
    render(){
        let loginResult;
        const {handleSubmit} = this.props;
        const {loading, error} = this.props.accessUser;
        if(loading){
            loginResult =
                <div className="w3-panel w3-center w3-blue w3-round-large ">
                    <h6 className="w3-text-white">로그인을 진행하고 있습니다...</h6>
                </div>
        }
        if(error){
            loginResult =
                <div className="w3-panel w3-center w3-red w3-round-large">
                    <h6 className="w3-text-white">{ error }</h6>
                </div>
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