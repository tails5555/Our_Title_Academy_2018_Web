import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import * as TitleAction from './../../../action/action_title';
import { renderField } from "../../input_render";
import { AlertBoxNote } from "../alert_box";
import { ModalScreen } from "../modal";

const mapStateToProps = ({ title }) => {
    const { element } = title.form;
    return {
        title : title.form,
        initialValues : {
            context : element && element.context
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    titleAction : bindActionCreators(TitleAction, dispatch)
});

function validate(values){
    var errors = {};
    var hasErrors = false;

    if(!values.context || values.context.trim() === ''){
        errors.context = '제목 내용을 입력하세요.';
        hasErrors = true;
    } else if(values.context.length > 65){
        errors.context = '제목은 65자 이하로 입력하세요.';
        hasErrors = true;
    }

    return hasErrors && errors;
}

const validateAndSaving = (value, dispatch) => {
    const titleModel = {
        context : value && value.context,
        requestId : value && value.requestId,
        userId : value && value.userId
    }
    dispatch(TitleAction.saveMyTitle(titleModel));
}

class TitleSaveForm extends Component {
    constructor(props){
        super(props);
        this.state = { element : null, loading : false, error : null, complete : null, type : null };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { element, loading, error, complete, type } = nextProps.title;
        if(
            element !== prevState.element || loading !== prevState.loading || error !== prevState.error || complete !== prevState.complete || type !== prevState.type
        ) {
            return { element, loading, error, complete, type };
        }
        return null;
    }

    componentDidMount(){
        const { requestId, userId, titleAction, change } = this.props;
        const { fetchHasMyTitle } = titleAction;
        if(userId !== 'ANONYMOUS_USER') {
            fetchHasMyTitle(requestId, userId);
            change('userId', userId);
            change('requestId', requestId);
        }
    }

    componentDidUpdate(prevProps, prevState){
        const { history, location } = this.props;
        const { complete, element, type } = this.state;
        if(complete === true){
            if(element && type === 'SAVING'){
                alert('저장된 제목이 수정 되었습니다. 공감은 그대로 저장 됩니다.');
                history.push(`/view_request/_refresh${location.search}`);
            } else if (type === 'DELETE') {
                alert('사용자가 저장한 제목이 삭제 되었습니다. 제목은 언제든지 추가 가능합니다..');
                history.push(`/view_request/_refresh${location.search}`);
            } else {
                alert('새로운 제목이 저장 되었습니다.');
                history.push(`/view_request/_refresh${location.search}`);
            }
        } else if(complete === false){
            alert('제목을 수정하는 도중 데이터베이스 내부에 오류가 발생 했습니다.\n 이 문제가 계속 발생하면 개발자에게 조치를 취하시길 바랍니다.');
            history.push(`/view_request/_refresh${location.search}`);
        }
    }

    componentWillUnmount(){
        const { titleAction, userId } = this.props;
        const { resetFetchHasMyTitle, resetSaveMyTitle } = titleAction;
        if(userId !== 'ANONYMOUS_USER'){
            resetFetchHasMyTitle();
            resetSaveMyTitle();
        }
    }

    handleClickDelete = () => {
        const { titleAction } = this.props;
        const { element } = this.state;
        const confirm = window.confirm('현재 작성하신 제목을 삭제합니다. 계속 하시겠습니까?');
        if(element !== null && confirm){
            const { deleteTitleById } = titleAction;
            deleteTitleById(element && element.id);
        }
    }

    render(){
        const { handleSubmit, userId } = this.props;
        const { element, loading, error, type } = this.state;
        const formTitle =
            !element ?
                <h4 className="w3-border-bottom w3-border-light-blue" style={{ marginBottom : '20px' }}>
                    <i className="icon fa-pencil" /> 제목을 등록합니다.
                </h4> :
                <h4 className="w3-border-bottom w3-border-light-blue" style={{ marginBottom : '20px' }}>
                    <i className="icon fa-eraser" /> 제목을 수정합니다.
                </h4>

        const formButtons =
            !element ?
                <Fragment>
                    <button type="submit" className="button fit large" style={{ marginBottom : '10px' }}>
                        <i className="icon fa-plus" /> 등록하기
                    </button>
                </Fragment> :
                <Fragment>
                    <button type="submit" className="button fit large" style={{ marginBottom : '10px' }}>
                        <i className="icon fa-pencil-square-o" /> 수정하기
                    </button>
                    <button type="button" className="button primary fit large" style={{ marginBottom : '10px' }} onClick={() => this.handleClickDelete()}>
                        <i className="icon fa-trash" /> 제목 삭제하기
                    </button>
                </Fragment>

        let formRender =
            (userId === 'ANONYMOUS_USER') ? (
                <AlertBoxNote
                    id={"forbidden_saving_text"}
                    icon={"fas fa-times-circle"}
                    title={"비회원은 제목을 올릴 수 없습니다."}
                    context={"제목을 올리기 위해 회원 등록이 필요합니다. 로그인을 진행하세요. :)"}
                />
            ) :
            (
                <form onSubmit={handleSubmit(validateAndSaving)}>
                    { formTitle }
                    <div id="context_input_group" style={{ marginBottom : '10px' }}>
                        <Field type="text" placeholder="제목은 65자 이내로 입력하세요." name="context" component={renderField} />
                    </div>
                    { formButtons }
                </form>
            );

        return (
            <Fragment>
                { formRender }
                {
                    error ?
                        <AlertBoxNote
                            id={"has_error_note"}
                            icon={"fas fa-warning"}
                            title={"제목을 저장, 삭제하는 도중 오류가 발생 했습니다."}
                            context={`오류 내용 : ${error}\n 계속해서 오류가 발생하면 개발자나 관리자에게 알려주세요 :)`}
                        /> : null
                }
                {
                    (type !== null) ?
                        <ModalScreen title="Loading" opened={loading}>
                            <div className="w3-center w3-padding">
                                <i className="fas fa-sync fa-spin" style={{fontSize: '80px', margin: '10px'}}/>
                                <h4>선택하신 분야에 해당 되는 제목학원을 {type === 'SAVING' ? '저장하는' : '삭제하는'} 중입니다!</h4>
                            </div>
                        </ModalScreen> : null
                }
            </Fragment>
        );
    }
}

TitleSaveForm = reduxForm({
    form : 'titleSaveForm',
    validate,
    enableReinitialize : true,
    keepDirtyOnReinitialize : true
})(TitleSaveForm);

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(TitleSaveForm)
);