import React, {Component} from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { renderDropzoneInput, renderQuill, renderField } from "../../form";
import {userCreateRequest, userCreateRequestSuccess, userCreateRequestFailure} from "../../../action/action_request";
import {withRouter} from 'react-router-dom';

function validate(values){
    var errors = {};
    var hasErrors = false;

    if(!values.intro || values.intro.trim() === ''){
        errors.intro = '제목을 입력하세요.';
        hasErrors = true;
    }

    if(!values.context || values.context.trim() === ''){
        errors.context = '내용을 입력하세요.';
        hasErrors = true;
    }

    if(!values.photo || values.photo.length <= 0){
        errors.photo = "사진을 올려주세요.";
        hasErrors = true;
    }

    return hasErrors && errors;
}

const validateAndCreateRequest = (values, dispatch, props) => {
    const fileArray = values.photo;
    let resultCount = (fileArray === undefined) ? 0 : fileArray.length;
    if(resultCount >= 1){
        const { loginId } = props.accessUser.principal;
        let requestModel = {
            userId : loginId,
            intro : values.intro,
            context : values.context
        }
        dispatch(userCreateRequest(requestModel, fileArray[0])).then((response) => {
            if (response.payload && response.payload.status !== 200) {
                dispatch(userCreateRequestFailure(response.payload.data));
                throw new SubmissionError(response.payload.data);
            }
            dispatch(userCreateRequestSuccess(response.payload));
        });
    }
}

class CreateRequest extends Component{
    componentWillUnmount(){
        this.props.resetCreateRequest();
    }

    render(){
        const {handleSubmit} = this.props;
        const {result} = this.props.createStatus;

        if(result === true){
            alert("님이 올린 요청들이 정상적으로 올라갔습니다.");
            this.props.history.push(`/create_request/_refresh`);
        } else if(result === false){
            alert("님이 올린 요청을 올리는 도중 서버에서 에러가 발생했습니다. 잠시 후 다시 시도 해주세요.");
            this.props.history.push(`/create_request/_refresh`);
        }

        return(
            <section>
                <header id="header">
                    <span className="logo"><strong>Our Title Academy 2018</strong> - CREATE REQUEST</span>
                </header>
                <br/><br/>
                <header className="major">
                    <h2>내 사진에 제목을 붙어주세요.</h2>
                </header>
                <h2 className="align-center">여러분이 제목을 붙이고 싶은 사진 한 장을 올려주세요.</h2>
                <form onSubmit={handleSubmit(validateAndCreateRequest)}>
                    <Field type="text" name="intro" component={renderField} label="요청 제목" placeholder="요청 제목을 입력하세요." />
                    <br/>
                    <label>요청 사연</label>
                    <Field name="context" size={400} component={renderQuill} />
                    <br/><br/><br/>
                    <label>요청 사진</label>
                    <Field
                        name="photo"
                        component={renderDropzoneInput}
                    />
                    <br/><br/>
                    <button className="button primary fit large"><i className="icon fa-upload"></i> 사진 등록하기</button>
                </form>
                <hr/>
                <div className="w3-container w3-round-medium w3-border w3-border-blue w3-light-blue">
                    <br/>
                    <p> - 부적절한 사진을 올리는 경우에는 관리자에 의해 삭제될 수 있다는 점 알립니다.</p>
                    <p> - 사진의 용량은 하나 당 1MB(png, jpg, bmp 등) ~ 3MB(gif)를 넘지 않아야 합니다.</p>
                    <p> - 카테고리는 여러분들이 선택하지 않으셔도 됩니다. 매니저와 관리자의 판단 하에 설정됩니다.</p>
                    <p> - 매니저와 관리자의 카테고리 선정은 부적절한 사진을 필터링 하기 위해 적어도 하루에서 이틀 사이 걸리오니 이 점 참고 바랍니다.</p>
                    <p> - 사진은 1장씩만 올릴 수 있습니다. 이 점 양해 부탁드립니다.</p>
                </div>
            </section>
        )
    }
}
export default reduxForm({
    form : 'requestForm',
    validate
})(withRouter(CreateRequest));