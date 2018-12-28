import React, { Component, Fragment } from 'react';
import queryString from 'query-string';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';

import * as RequestAction from "../../../action/action_request";
import { AlertBoxNote } from "../alert_box";
import { ModalScreen } from "../modal";
import { renderDropzoneInput, renderField, renderQuill } from "../../input_render";

const selector = formValueSelector('requestSaveForm');

const mapStateToProps = (state) => ({
    request : state.request.form,
    requestId : selector(state, 'requestId')
});

const mapDispatchToProps = (dispatch) => ({
    requestAction : bindActionCreators(RequestAction, dispatch)
});

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

    if(!values.requestId) {
        if (!values.photo || values.photo.length <= 0) {
            errors.photo = "사진을 올려주세요.";
            hasErrors = true;
        }
    }

    return hasErrors && errors;
}

const validateAndSavingRequest = (values, dispatch) => {
    const fileArray = values.photo;
    let resultCount = 0;
    if(Array.isArray(fileArray)) {
        resultCount = fileArray.length;
    }
    let requestModel = {
        requestId : values && (values.requestId || 0),
        userId : values && values.userId,
        intro : values && values.intro,
        context : values && values.context
    }
    if(resultCount >= 1){
        dispatch(RequestAction.savingMainRequestByModel(requestModel, fileArray[0]));
    } else {
        dispatch(RequestAction.savingMainRequestByModel(requestModel, null));
    }
}

class RequestSaveForm extends Component {
    constructor(props) {
        super(props);
        this.state = { element : null, userId : null, loading : false, error : null, complete : null, type : null };
    }

    componentDidMount(){
        const { userId, change } = this.props;
        change('userId', userId);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { element, userId } = prevState;
        const { request } = nextProps;
        const { loading, error, complete, type } = request;
        if(
            loading !== prevState.loading || error !== prevState.error || complete !== prevState.complete || type !== prevState.type || element !== nextProps.element || userId !== nextProps.userId
        ) {
            return {
                element : nextProps.element,
                userId : nextProps.userId,
                loading, error, complete, type
            };
        }
        return null;
    }

    componentDidUpdate(prevState, prevProps){
        const { history, location, change, requestId } = this.props;
        const { complete, type, element } = this.state;
        if(complete === true){
            if(requestId && type === 'SAVING'){
                alert('저장된 사연이 수정 되었습니다. 공감은 그대로 저장 됩니다.');
                history.push(`/view_request/_refresh${location.search}`);
            } else if (type === 'DELETE') {
                alert('선택하신 사연이 삭제 되었습니다.');
                const queryModel = queryString.parse(location.search);
                queryModel['id'] = undefined;
                history.push(`/category/_move?${queryString.stringify(queryModel)}`);
            } else {
                alert('새로운 사연이 저장 되었습니다. 선정성 확인까지 1~2일이 걸리오니, 이후에 확인 부탁 드립니다. 홈으로 이동합니다.');
                history.push('/');
            }
        } else if(complete === false){
            alert('사연을 수정하는 도중 데이터베이스 내부에 오류가 발생 했습니다.\n 이 문제가 계속 발생하면 개발자에게 조치를 취하시길 바랍니다.');
            history.push(`/view_request/_refresh${location.search}`);
        }

        if(element !== null && element !== prevProps.element)  {
            change('intro', element && element.intro);
            change('context', element && element.context);
            change('requestId', element && element.id);
        } else if(element === null && element !== prevProps.element){
            change('intro', '');
            change('context', '');
            change('requestId', 0);
        }
    }

    componentWillUnmount(){
        const { requestAction } = this.props;
        const { resetSavingMainRequestByModel } = requestAction;
        resetSavingMainRequestByModel();
    }

    render(){
        const { handleSubmit } = this.props;
        const { element, error, type, loading } = this.state;
        return(
            <Fragment>
                <form onSubmit={handleSubmit(validateAndSavingRequest)}>
                    <Field type="text" name="intro" component={renderField} label="요청 제목" placeholder="요청 제목을 입력하세요." />
                    <Field name="context" size={200} component={renderQuill} />
                    {
                        element === null ?
                            <Fragment>
                                <label htmlFor="photo">요청 사진</label>
                                <Field
                                    name="photo"
                                    component={renderDropzoneInput}
                                />
                            </Fragment> : null

                    }
                    <button className="button primary fit large">
                        <i className="icon fa-upload" /> { element ? '사연 수정하기' : '사연 등록하기'}
                    </button>
                </form>
                <hr/>
                <div className="w3-round-medium w3-border w3-border-light-blue w3-pale-blue" style={{ padding : '8px' }}>
                    <h6> - 부적절한 사진을 올리는 경우(성인물, 정치물, 광고, 잔인한 사진 등)에는 관리자에 의해 차단될 수 있습니다.</h6>
                    <h6> - 사진의 용량은 하나 당 1MB(png, jpg, bmp 등) ~ 3MB(gif)를 넘지 않아야 합니다.</h6>
                    <h6> - 카테고리는 여러분들이 선택하지 않으셔도 됩니다. 매니저와 관리자의 판단 하에 설정됩니다.</h6>
                    <h6> - 매니저와 관리자의 카테고리 선정은 부적절한 사진을 필터링 하기 위해 적어도 하루에서 이틀 사이 걸리오니 이 점 참고 바랍니다.</h6>
                    <h6> - 사진은 1장씩만 올릴 수 있습니다. 이 점 양해 부탁드립니다.</h6>
                    <h6> - 그리고 사연 글을 올리고 난 이후의 시점으로 사진은 변경이 불가능합니다. 다만 삭제는 상관 없이 언제든지 가능합니다.</h6>
                </div>
                {
                    error ?
                        <AlertBoxNote
                            id={"has_error_note"}
                            icon={"fas fa-warning"}
                            title={"사연을 저장, 삭제하는 도중 오류가 발생 했습니다."}
                            context={`오류 내용 : ${error}\n 계속해서 오류가 발생하면 개발자나 관리자에게 알려주세요 :)`}
                        /> : null
                }
                {
                    (type !== null) ?
                        <ModalScreen title="Loading" opened={loading}>
                            <div className="w3-center w3-padding">
                                <i className="fas fa-sync fa-spin" style={{fontSize: '80px', margin: '10px'}}/>
                                <h4>선택하신 제목 학원 사연을 {type === 'SAVING' ? '저장하는' : '삭제하는'} 중입니다!</h4>
                            </div>
                        </ModalScreen> : null
                }
            </Fragment>
        );
    }
}

RequestSaveForm = reduxForm({
    form : 'requestSaveForm',
    validate,
    enableReinitialize : true,
    keepDirtyOnReinitialize : true
})(RequestSaveForm);

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(RequestSaveForm)
);