import React, { Component, Fragment } from 'react';

import { reduxForm, Field } from 'redux-form';
import { renderField } from "./../../input_render";
import * as GuestAction from './../../../action/action_guest';
import {MajorTitleHeader} from "../header";

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
    return dispatch(GuestAction.executeLoginByModel(values));
}

class LoginActionForm extends Component {
    constructor(props){
        super(props);
        this.state = { complete : null, loading : false, error : null };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { complete, loading, error } = prevState;
        const { guest } = nextProps;
        if(
            complete !== guest.complete || loading !== guest.loading || error !== guest.error
        ) {
            return {
                complete : guest.complete, loading : guest.loading, error : guest.error
            };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        const { complete } = this.state;
        if(complete === 200) {
            window.location.href = '/';
        }
    }

    render(){
        const { handleSubmit } = this.props;
        const { loading, error, complete } = this.state;

        let loginResult = (
            <span className="w3-tag w3-padding w3-round-large w3-blue w3-center">
                <i className="fas fa-check" /> 로그인을 하면 다양한 컨텐츠를 즐길 수 있습니다 :)
            </span>
        );

        if(loading){
            loginResult = (
                <span className="w3-tag w3-padding w3-round-large w3-yellow w3-center">
                    <i className="fas fa-spin fa-spinner" /> 로그인을 진행하고 있습니다...
                </span>
            );
        } else if(complete === 200) {
            loginResult = (
                <span className="w3-tag w3-padding w3-round-large w3-green w3-center">
                    <i className="fas fa-check" /> 로그인이 완료 되었습니다. 홈으로 이동합니다 :)
                </span>
            );
        }
        if(error){
            loginResult = (
                <span className="w3-tag w3-padding w3-round-large w3-red w3-center">
                    <i className="fas fa-warning" /> { error }
                </span>
            );
        }

        return(
            <Fragment>
                <section id="user_login" className="alt">
                    <MajorTitleHeader title="Login" />
                    <form onSubmit={handleSubmit(validateAndUserLogin)}>
                        <div id="loginId_input_group" style={{ margin : '10px 0px' }}>
                            <Field name="loginId" type="text" component={renderField} label="사용자 ID" placeholder="ID를 입력하세요." />
                        </div>
                        <div id="password_input_group" style={{ margin : '10px 0px' }}>
                            <Field name="password" type="password" component={renderField} label="사용자 비밀번호" placeholder="비밀번호를 입력하세요." />
                        </div>
                        <div id="login_btn_margin" style={{ margin : '10px 0px' }}>
                            <button type="submit" className="button primary fit large">
                                <i className="fas fa-key" /> Login
                            </button>
                        </div>
                    </form>
                    <div id="alert_margin" className="w3-center" style={{ margin : '10px auto', wordBreak : 'keep-all' }}>
                        { loginResult }
                    </div>
                </section>
            </Fragment>
        );
    }
}

export default reduxForm({
    form : 'loginForm',
    validate
})(LoginActionForm);