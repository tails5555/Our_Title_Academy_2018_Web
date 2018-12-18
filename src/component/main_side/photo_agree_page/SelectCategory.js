import React, {Component} from 'react';
import {RequestProfile} from "../profile_image";
import {reduxForm, Field, SubmissionError} from 'redux-form';
import {Link, withRouter} from 'react-router-dom';
import {renderSelect} from "../../input_render";
import {managerExecuteFetchRequest, managerExecuteFetchRequestSuccess, managerExecuteFetchRequestFailure} from "../../../action/action_request";
const IMAGE_URL = 'http://127.0.0.1:8082/ContextAPI/photo';

function validate(values){
    var errors = {};
    var hasErrors = false;

    if(!values.categoryId || values.categoryId === 0){
        errors.categoryId = '카테고리를 선택하세요.';
        hasErrors = true;
    }

    return hasErrors && errors;
}

const validateAndAgreePhoto = (values, dispatch, props) => {
    const {requestDTO} = props.selectRequest.request;
    let agreeModel = {
        requestId : requestDTO.id,
        categoryId : values.categoryId,
        available : (values.available !== undefined) ? values.available : false
    }
    return dispatch(managerExecuteFetchRequest(agreeModel)).then((response) => {
        if(response.payload && response.payload.status !== 200){
            dispatch(managerExecuteFetchRequestFailure(response.payload));
            throw new SubmissionError(response.payload.data);
        }
        dispatch(managerExecuteFetchRequestSuccess(response.payload));
    });
}


class SelectCategory extends Component{
    componentWillMount(){
        const {principal} = this.props.accessUser;
        this.props.fetchSelectRequest(this.props.match.params.id, principal.loginId);
    }

    componentWillUnmount(){
        this.props.resetExecuteFetchRequest();
        this.props.resetFetchSelectRequest();
    }

    render(){
        const {handleSubmit} = this.props;
        const {request} = this.props.selectRequest;
        const {categories} = this.props.menuCategories;
        const {result} = this.props.agreeStatus;

        let requestDTO;
        if(request !== null){
            requestDTO = request.requestDTO;
        }

        if(result === true){
            alert("현재 사진이 요청 목록에 보여집니다. 요청 사진이 부적절하게 생각되면 다시 숨길 수 있습니다.");
            this.props.history.push(`../photo_agree`);
        } else if(result === false){
            alert("요청을 허가하는 도중 서버에서 에러가 발생했습니다. 잠시 후 다시 시도 해주세요.");
            this.props.history.push(`../photo_agree`);
        }

        return(
            <section>
                <header id="header">
                    <span className="logo"><strong>Our Title Academy 2018</strong> - SELECT CATEGORY</span>
                </header>
                <br/><br/>
                <header className="major">
                    <h2>카테고리 선택</h2>
                </header>
                <div className="w3-right-align">
                    <Link to="../photo_agree"><button className="button primary">목록으로</button></Link>
                </div>
                <br/>
                <div className="w3-row-padding">
                    <div className="w3-third">
                        <RequestProfile loginId={(requestDTO === undefined) || requestDTO.userId} />
                        <br/><br/>
                    </div>
                    <div className="w3-twothird">
                        <div className="w3-card-4 w3-round-large w3-display-container">
                            <img
                                style={{
                                    width : '100%',
                                    height : 'auto'
                                }}
                                src={`${IMAGE_URL}/request_image/${(requestDTO === undefined) ? 1 : requestDTO.id}`}
                                className="w3-image w3-round-large"
                            />
                            <br/><br/>
                            <div className="w3-container">
                                <h3 className="w3-border-bottom w3-border-red">{(requestDTO === undefined) || requestDTO.intro}</h3>
                                <div dangerouslySetInnerHTML={ {__html: (requestDTO === undefined || requestDTO.context) } }/>
                                <p className="w3-border-top w3-border-blue">
                                    <br/>
                                    <i className="icon fa-eye"></i> 조회수 <span className="w3-badge w3-light-blue">{(requestDTO === undefined) || requestDTO.view}</span>
                                    <br/>
                                    <i className="icon fa-calendar"></i> 등록 날짜 <span className="w3-tag w3-light-green w3-round-large">{(requestDTO === undefined) || requestDTO.writtenDate}</span>
                                    <br/>
                                </p>
                            </div>
                            <div className="w3-display-topleft w3-large w3-container w3-padding-small w3-round-medium w3-black w3-opacity">
                                <i className="icon fa-book"></i> {(requestDTO === undefined) || (requestDTO.category === null) ? "미정" : requestDTO.category.name}<br/>
                            </div>
                            <br/>
                        </div>
                        <br/>
                    </div>
                </div>
                <br/>
                <form onSubmit={handleSubmit(validateAndAgreePhoto)}>
                    <header className="major">
                        <h2>배정 카테고리를 신중히 선택하세요.</h2>
                    </header>
                    <label>배정 카테고리 선택</label>
                    <Field name="categoryId" component={renderSelect} children={ categories.map((category) => <option key={`category_${category.id}`} value={category.id}>{category.name}</option> )} />
                    <br/>
                    <Field
                        id="available"
                        name="available"
                        component="input"
                        type="checkbox"
                    />
                    <label htmlFor="available">이를 체크하면 현재 요청 목록에 올라갑니다. 부적절한 사진이 있는 경우에 한 번 더 확인 바랍니다.</label>
                    <br/><br/>
                    <button type="submit" className="button primary fit large">사진 허가하기</button>
                </form>
            </section>
        )
    }
}
export default reduxForm({
    form : 'requestAgreeForm',
    validate
})(withRouter(SelectCategory));