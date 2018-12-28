import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';

import * as CommentAction from './../../../action/action_comment';
import { AlertBoxNote } from "../alert_box";
import { ModalScreen } from "../modal";
import { renderTextarea } from "../../input_render";

const selector = formValueSelector('commentSaveForm');

const mapStateToProps = (state) => ({
    comment : state.comment.form,
    commentId : selector(state, 'commentId')
});

const mapDispatchToProps = (dispatch) => ({
    commentAction : bindActionCreators(CommentAction, dispatch)
});

function validate(values){
    let errors = {};
    let hasErrors = false;

    if(!values.context || values.context.trim() === ''){
        errors.context = '댓글 내용을 입력하세요.';
        hasErrors = true;
    } else if(values.context.length > 65536){
        errors.context = '댓글은 65536자 이하로 입력하세요.';
        hasErrors = true;
    }

    return hasErrors && errors;
}

const validateAndSaving = (value, dispatch) => {
    let { context } = value;
    if(context && context.trim() !== '') {
        let resultString = '';
        let lines = context.split("\n");
        for (let i = 0; i < lines.length; i++) {
            if (lines[i] !== undefined)
                resultString += lines[i] + "<br>";
        }
        const commentModel = {
            commentId : value && (value.commentId || 0),
            context : resultString,
            requestId : value && value.requestId,
            userId : value && value.userId
        }
        dispatch(CommentAction.saveCommentByModel(commentModel));
    } else {
        alert('댓글을 입력하시길 바랍니다.');
    }
}

class CommentSaveForm extends Component {
    constructor(props){
        super(props);
        this.state = { loading : false, error : null, complete : null, type : null, element : null };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { comment, element } = nextProps;
        const { loading, error, complete, type } = comment;
        if(
            loading !== prevState.loading || error !== prevState.error || complete !== prevState.complete || type !== prevState.type || element !== prevState.element
        ) {
            return { loading, error, complete, type, element };
        }
        return null;
    }

    componentDidMount(){
        const { userId, requestId, change } = this.props;
        change('userId', userId);
        change('requestId', requestId);
    }

    componentDidUpdate(prevProps, prevState){
        const { history, location, change, commentId } = this.props;
        const { complete, type, element } = this.state;
        if(complete === true){
            if(commentId && type === 'SAVING'){
                alert('저장된 댓글이 수정 되었습니다. 공감은 그대로 저장 됩니다.');
                history.push(`/view_request/_refresh${location.search}`);
            } else if (type === 'DELETE') {
                alert('사용자가 저장한 댓글이 삭제 되었습니다.');
                history.push(`/view_request/_refresh${location.search}`);
            } else {
                alert('새로운 댓글이 저장 되었습니다.');
                history.push(`/view_request/_refresh${location.search}`);
            }
        } else if(complete === false){
            alert('댓글을 수정하는 도중 데이터베이스 내부에 오류가 발생 했습니다.\n 이 문제가 계속 발생하면 개발자에게 조치를 취하시길 바랍니다.');
            history.push(`/view_request/_refresh${location.search}`);
        }
        if(element !== null && element !== prevProps.element)  {
            let text = element && element.context.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
            change('context', text);
            change('commentId', element && element.id);
        } else if(element === null && element !== prevProps.element){
            change('context', '');
            change('commentId', 0);
        }
    }

    componentWillUnmount(){
        const { commentAction, userId } = this.props;
        const { resetSaveCommentByModel } = commentAction;
        if(userId !== 'ANONYMOUS_USER'){
            resetSaveCommentByModel();
        }
    }

    handleClickDelete = () => {
        const { commentAction, element } = this.props;
        const confirm = window.confirm('현재 수정 중인 댓글을 삭제합니다. 계속 하시겠습니까?');
        if(element !== null && confirm){
            const { deleteCommentById } = commentAction;
            deleteCommentById(element && element.id);
        }
    }

    render(){
        const { handleSubmit, userId, element } = this.props;
        const { loading, error, type } = this.state;
        const formTitle =
            !element ?
                <h4 className="w3-border-bottom w3-border-cyan" style={{ marginBottom : '20px' }}>
                    <i className="icon fa-pencil" /> 댓글을 등록합니다.
                </h4> :
                <h4 className="w3-border-bottom w3-border-cyan" style={{ marginBottom : '20px' }}>
                    <i className="icon fa-eraser" /> 댓글을 수정합니다.
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
                        <i className="icon fa-trash" /> 댓글 삭제하기
                    </button>
                </Fragment>

        let formRender =
            (userId === 'ANONYMOUS_USER') ? (
                    <AlertBoxNote
                        id={"forbidden_saving_text"}
                        icon={"fas fa-times-circle"}
                        title={"비회원은 댓글을 올릴 수 없습니다."}
                        context={"댓글을 작성하기 위해 회원 등록이 필요합니다. 로그인을 진행하세요. :)"}
                    />
                ) :
                (
                    <form onSubmit={handleSubmit(validateAndSaving)}>
                        { formTitle }
                        <div id="context_input_group" style={{ marginBottom : '10px' }}>
                            <Field type="text" placeholder="댓글은 개행 문자가 포함 되어 있어도 됩니다." name="context" component={renderTextarea} />
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
                            title={"댓글을 저장, 삭제하는 도중 오류가 발생 했습니다."}
                            context={`오류 내용 : ${error}\n 계속해서 오류가 발생하면 개발자나 관리자에게 알려주세요 :)`}
                        /> : null
                }
                {
                    (type !== null) ?
                        <ModalScreen title="Loading" opened={loading}>
                            <div className="w3-center w3-padding">
                                <i className="fas fa-sync fa-spin" style={{fontSize: '80px', margin: '10px'}}/>
                                <h4>선택하신 제목학원의 댓글을 {type === 'SAVING' ? '저장하는' : '삭제하는'} 중입니다!</h4>
                            </div>
                        </ModalScreen> : null
                }
            </Fragment>
        );
    }
}

CommentSaveForm = reduxForm({
    form : 'commentSaveForm',
    validate,
    enableReinitialize : true,
    keepDirtyOnReinitialize : true
})(CommentSaveForm);

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CommentSaveForm)
);