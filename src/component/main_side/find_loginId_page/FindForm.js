import React, {Component} from 'react';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import {renderField} from "../../input_render";
import {guestFindLoginId, guestFindLoginIdSuccess, guestFindLoginIdFailure} from "../../../action/action_guest";

function validate(values) {
    var errors = {};
    var hasErrors = false;

    if (!values.name || values.name.trim() === '') {
        errors.name = '이름을 입력하세요.';
        hasErrors = true;
    }

    var emailExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
    if (!values.email || values.email.trim() === '') {
        errors.email = '이메일을 입력하세요.';
        hasErrors = true;
    } else if (!values.email.match(emailExp)) {
        errors.email = '이메일 형식을 확인하세요.';
        hasErrors = true;
    }

    return hasErrors && errors;
}

const validateAndFindLoginId = (values, dispatch) => {
    return dispatch(guestFindLoginId(values)).then(
        (response) => {
            if(response.payload && response.payload.status !== 200 && response.payload.status !== 204){
                dispatch(guestFindLoginIdFailure(response.payload));
                throw new SubmissionError(response.payload.data);
            }
            dispatch(guestFindLoginIdSuccess(response.payload));
        }
    )
}


class FindForm extends Component{
    componentWillUnmount(){
        this.props.resetFindLoginId();
    }

    render(){
        const {result} = this.props.findLoginId;
        const {handleSubmit} = this.props;
        return(
            <section>
                <header id="header">
                    <span className="logo"><strong>Our Title Academy 2018</strong> - FIND LOGIN ID</span>
                </header>
                <br/><br/>
                <header className="major">
                    <h2>아이디 찾기</h2>
                </header>
                <div className="w3-panel w3-round-large w3-blue">
                    <h3 className="w3-text-white align-center">회원의 ID를 찾기 위해 아래와 같은 폼을 입력하세요.</h3>
                </div>
                <form onSubmit={handleSubmit(validateAndFindLoginId)}>
                    <Field type="text" name="name" component={renderField} label="회원 이름" placeholder="가입할 때 입력한 이름을 입력하세요." />
                    <br/>
                    <Field type="text" name="email" component={renderField} label="회원 이메일" placeholder="가입할 때 입력한 이메일을 입력하세요." />
                    <br/><br/>
                    <button type="submit" className="button primary fit large">아이디 조회 하기</button>
                </form>
                {
                    result === null ? '' :
                        result.trim() === '' ?
                            <div className="w3-panel w3-round-large w3-pale-red">
                                <span style={ {
                                    fontSize : '150px',
                                    lineHeight : '0.6em',
                                    opacity : 0.2
                                } }><i className="fas fa-times"></i></span>

                                <h3>회원 정보가 존재하지 않습니다.</h3>
                                <p>입력하신 정보를 다시 확인 해 주세요.</p>
                            </div> :
                            <div className="w3-panel w3-round-large w3-pale-green">
                                <span style={ {
                                    fontSize : '150px',
                                    lineHeight : '0.6em',
                                    opacity : 0.2
                                } }><i className="fas fa-check-circle"></i></span>
                                <h3>회원 아이디를 찾았습니다.</h3>
                                <p>아이디는 {result} 입니다. 비밀번호는 관리자에게 조치 받으시길 바랍니다.</p>
                            </div>
                }
            </section>
        )
    }
}
export default reduxForm({
    form : 'findModel',
    validate
})(FindForm);