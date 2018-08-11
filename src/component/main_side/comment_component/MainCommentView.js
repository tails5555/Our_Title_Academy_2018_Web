import React, {Component} from 'react';
import {RequestProfile} from "../profile_image";
import {reduxForm, Field, SubmissionError} from 'redux-form';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import InfiniteScroll from 'react-infinite-scroll-component';

import {
    appFetchMainCommentList, appFetchMainCommentListSuccess, appFetchMainCommentListFailure, resetAppFetchMainCommentList,
    appExecuteUserSaveComment, appExecuteUserSaveCommentSuccess, appExecuteUserSaveCommentFailure, resetAppExecuteUserSaveComment,
    appExecuteUserDeleteComment, appExecuteUserDeleteCommentSuccess, appExecuteUserDeleteCommentFailure, resetAppExecuteUserDeleteComment
} from "../../../action/action_comment";

import './modal.css';

function mapStateToProps(state){
    return {
        commentList : state.comment.commentList,
        saveStatus : state.comment.saveStatus,
        deleteStatus : state.comment.deleteStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        fetchCommentList : (requestId, userId) => dispatch(appFetchMainCommentList(requestId, userId)).then((response) => {
            if(!response.error){
                dispatch(appFetchMainCommentListSuccess(response.payload));
            }else{
                dispatch(appFetchMainCommentListFailure(response.payload));
            }
        }),
        resetFetchCommentList : () => dispatch(resetAppFetchMainCommentList()),
        userSaveComment : (commentId, userId, requestId, context) => dispatch(appExecuteUserSaveComment(commentId, userId, requestId, context)).then((response) => {
            if(!response.error){
                dispatch(appExecuteUserSaveCommentSuccess(response.payload));
            }else{
                dispatch(appExecuteUserSaveCommentFailure(response.payload));
            }
        }),
        resetUserSaveComment : () => dispatch(resetAppExecuteUserSaveComment()),
        userDeleteComment : (commentId) => dispatch(appExecuteUserDeleteComment(commentId)).then((response) => {
            if(!response.error){
                dispatch(appExecuteUserDeleteCommentSuccess(response.payload));
            }else{
                dispatch(appExecuteUserDeleteCommentFailure(response.payload));
            }
        }),
        resetUserDeleteComment : () => dispatch(resetAppExecuteUserDeleteComment())
    }
}

const validateAndCreateComment = (values, dispatch, props) => {
    let resultString = '';
    if(values.context !== undefined){
        var lines = values.context.split("\n");
        for (var i = 0; i < lines.length; i++) {
            if(lines[i] !== undefined)
                resultString += lines[i] + "<br>";
        }
        if(values.context.trim() !== '') {
            return dispatch(appExecuteUserSaveComment(0, props.loginId, props.requestId, resultString)).then(
                (response) => {
                    if (response.payload && response.payload.status !== 200) {
                        dispatch(appExecuteUserSaveCommentFailure(response.payload));
                        throw new SubmissionError(response.payload.data);
                    }
                    dispatch(appExecuteUserSaveCommentSuccess(response.payload));
                }
            )
        } else {
            alert("댓글에는 공백만 저장될 수 없습니다! 다시 작성 부탁 드립니다.");
        }
    } else {
        alert("댓글 내용을 써 주세요!");
    }
}

class MainCommentView extends Component{
    constructor(props){
        super(props);
        this.state = { show : false, selectIdx : -1, selectContext : null, renderSize : 20, loginId : this.props.loginId, requestId : this.props.requestId, pathname : this.props.pathname, search : this.props.search };
    }

    componentWillReceiveProps(nextProps){
        if (this.props.loginId !== nextProps.loginId){
            this.propsUpdating('loginId', nextProps.loginId);
        }
        if (this.props.requestId !== nextProps.requestId){
            this.propsUpdating('requestId', nextProps.requestId);
        }
        if (this.props.pathname !== nextProps.pathname){
            this.propsUpdating('pathname', nextProps.pathname);
        }
        if (this.props.search !== nextProps.search){
            this.propsUpdating('search', nextProps.search);
        }
    }

    propsUpdating(types, value){
        let self = this;
        self.setState({
            [types] : value
        })
    }

    handleClickDelete(commentId){
        let isDelete = window.confirm("님이 현재 선택한 댓글을 삭제합니다. 삭제 이후에는 복구가 불가능합니다. 계속 하시겠습니까?");
        if(isDelete){
            this.props.userDeleteComment(commentId);
        }
    }

    handleChange(event){
        this.setState({
            selectContext : event.target.value
        });
    }

    fetchMoreData(){
        const {renderSize} = this.state;
        setTimeout(() => {
            this.setState({
                renderSize : renderSize + 10
            });
        }, 2000);
    }

    handleSubmit(event){
        const {selectIdx, selectContext, loginId, requestId} = this.state;
        if(selectContext.trim() === '') {
            alert("댓글에는 공백이 존재할 수 없습니다. 다시 입력하세요.");
            event.preventDefault();
        }
        else{
            let resultString='';
            let lines = selectContext.split("\n");
            for (var i = 0; i < lines.length; i++) {
                if(lines[i] !== undefined)
                    resultString += lines[i] + "<br>";
            }
            this.props.userSaveComment(selectIdx, loginId, requestId, resultString);
            event.preventDefault();
        }
    }

    showModal(idx, context){
        let text = context.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
        this.setState({
            selectIdx : idx,
            selectContext : text,
            show : true
        })
    }

    hideModal(){
        this.setState({
            selectIdx : -1,
            selectContext : null,
            show: false
        });
    }

    componentWillMount(){
        const {loginId, requestId} = this.state;
        this.props.fetchCommentList(requestId, loginId);
    }

    componentWillUnmount(){
        this.props.resetFetchCommentList();
        this.props.resetUserDeleteComment();
        this.props.resetUserSaveComment();
    }

    render(){
        const {handleSubmit} = this.props;
        const {saveResult} = this.props.saveStatus;
        const {deleteResult} = this.props.deleteStatus;
        const {comments} = this.props.commentList;
        const {renderSize, show, selectContext, pathname, loginId, requestId, search} = this.state;
        let renderArray = [];

        if(comments.length > renderSize)
            renderArray = comments.slice(0, renderSize);
        else
            renderArray = comments.slice();

        if(saveResult === true){
            alert("입력하신 댓글이 저장되었습니다.");
            this.props.history.push(`/view_request/${requestId}/_refresh${search}`);
        } else if(saveResult === false){
            alert("댓글 저장 도중 예기치 않는 문제가 발생했습니다. 최대한 빨리 조치하겠습니다.");
            this.props.history.push(`/view_request/${requestId}/_refresh${search}`);
        }

        if(deleteResult === true){
            alert("입력하신 댓글이 삭제되었습니다.");
            this.props.history.push(`/view_request/${requestId}/_refresh${search}`);
        } else if(saveResult === false){
            alert("댓글 삭제 도중 예기치 않는 문제가 발생했습니다. 최대한 빨리 조치하겠습니다.");
            this.props.history.push(`/view_request/${requestId}/_refresh${search}`);
        }

        let renderComments = renderArray.length > 0 ? renderArray.map((comment, idx) => {
            let liClass;
            if(loginId === comment.userId){
                liClass = "w3-row w3-panel w3-pale-blue w3-topbar w3-bottombar w3-border-blue";
            }else {
                liClass = "w3-row w3-panel w3-topbar w3-bottombar w3-border-teal"
            }
            return(
                <div className={liClass} key={`comment_${idx}`}>
                    <div className="w3-quarter">
                        <br/>
                        <span className="image w3-center" style={{
                            width : '150px'
                        }}>
                            <RequestProfile loginId={comment.userId} />
                        </span>
                        <br/><br/>
                    </div>
                    <div className="w3-threequarter">
                        <br/>
                        <p><i className="icon fa-calendar"></i> {comment.writtenDate}</p>
                        {
                            comment.likeChecked === true ?
                                <Link to={`${pathname}/comment_empathy/${comment.id}/${loginId}/like${search}`}>
                                    <span className="w3-tag w3-round-large w3-blue w3-border-light-blue">
                                        <i className="icon fa-thumbs-up"></i> {comment.likeCount} <i className="icon fa-check-circle"></i>
                                    </span>
                                </Link> :
                                comment.likeChecked !== null ?
                                    <Link to={`${pathname}/comment_empathy/${comment.id}/${loginId}/like${search}`}>
                                        <span className="w3-tag w3-round-large w3-blue">
                                            <i className="icon fa-thumbs-up"></i> {comment.likeCount}
                                        </span>
                                    </Link>
                                    :
                                    <span className="w3-tag w3-round-large w3-blue">
                                        <i className="icon fa-thumbs-up"></i> {comment.likeCount}
                                    </span>
                        }
                        &nbsp;&nbsp;
                        {
                            comment.hateChecked === true ?
                                <Link to={`${pathname}/comment_empathy/${comment.id}/${loginId}/hate${search}`}>
                                    <span className="w3-tag w3-round-large w3-red">
                                        <i className="icon fa-thumbs-down"></i> {comment.hateCount} <i className="icon fa-check-circle"></i>
                                    </span>
                                </Link> :
                                comment.hateChecked !== null ?
                                    <Link to={`${pathname}/comment_empathy/${comment.id}/${loginId}/hate${search}`}>
                                        <span className="w3-tag w3-round-large w3-red">
                                            <i className="icon fa-thumbs-down"></i> {comment.hateCount}
                                        </span>
                                    </Link> :
                                    <span className="w3-tag w3-round-large w3-red">
                                        <i className="icon fa-thumbs-down"></i> {comment.hateCount}
                                    </span>
                        }
                        &nbsp;&nbsp;
                        {
                            comment.userId === loginId ?
                                <span className="w3-tag w3-round-large w3-hover-pale-red w3-pink" style={{cursor : 'pointer'}} onClick={() => this.handleClickDelete(comment.id)}>
                                    <i className="icon fa-trash"></i> 삭제
                                </span> :
                                null
                        }
                        &nbsp;&nbsp;
                        {
                            comment.userId === loginId ?
                                <span className="w3-tag w3-round-large w3-hover-cyan w3-teal" style={{cursor : 'pointer'}} onClick={() => this.showModal(comment.id, comment.context)}>
                                    <i className="icon fa-eraser"></i> 수정
                                </span> :
                                null
                        }
                        <br/>
                        <div className="w3-panel w3-border-top w3-border-bottom w3-border-blue" style={{wordWrap: 'break-word'}}>
                            <br/>
                            <p dangerouslySetInnerHTML={ {__html: (comment === null || comment.context) } }></p>
                        </div>
                    </div>
                </div>
            );
        }) : <div className="w3-panel w3-pale-red w3-round-large">
                <br/>
                <span style={{fontSize:'80px', lineHeight:'0.6em', opacity:'0.2'}}><i className="fas fa-times-circle"></i></span>
                <br/>
                <h2 className="w3-xlarge"><i>현재까지 등록된 댓글이 없습니다.</i></h2>
                <p>여러분이 새로운 댓글을 추가 해주세요!</p>
            </div>

        const showHideClassName = show ? "modal display-block w3-round-large w3-animate-opacity" : "modal display-none w3-animate-opacity";

        let renderModal = (
            <div className={showHideClassName}>
                <section className="modal-main-comment">
                    <div className="w3-container w3-teal">
                        <h2 className="w3-text-white">댓글을 수정합니다.</h2>
                    </div>
                    <div className="w3-container">
                        <br/>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <textarea name="context" onChange={this.handleChange.bind(this)} rows={5} placeholder={"수정할 댓글 내용을 입력하세요."} value={selectContext} />
                            <br/>
                            <button type="submit" className="button fit large"><i className="icon fa-pencil"></i> 댓글 수정하기</button>
                            <br/><br/>
                            <button type="button" className="button fit large primary" onClick={() => this.hideModal()}><i className="icon fa-times"></i> 취소하기</button>
                        </form>
                    </div>
                </section>
            </div>
        );

        return(
            <div>
                <h3 className="w3-border-bottom w3-border-deep-orange"><i className="fas fa-comment"></i> 이 제목 학원에 대한 수강생의 의견</h3>
                {
                    loginId === 'ANONYMOUS_USER' ?
                        <div className="w3-panel w3-round-medium w3-pale-red">
                            <h3><i className="fas fa-exclamation-triangle"></i> 댓글을 등록할 수 없습니다.</h3>
                            <p>댓글을 등록하기 위해 로그인을 진행하시길 바랍니다.</p>
                        </div> :
                        <form onSubmit={handleSubmit(validateAndCreateComment)}>
                            <h4><i className="icon fa-pencil"></i> 댓글을 등록합니다.</h4>
                            <Field name="context" component="textarea" rows={5} placeholder={"댓글 내용을 입력하세요."} />
                            <br/>
                            <button type="submit" className="button fit large"><i className="icon fa-plus"></i> 등록하기</button>
                        </form>
                }

                <div className="w3-ul">
                    {
                        renderArray.length > 0 ?
                            <InfiniteScroll
                                dataLength={renderArray.length}
                                next={this.fetchMoreData.bind(this)}
                                hasMore={renderArray.length < comments.length}
                                loader={
                                    <h2 className="w3-center">
                                        <i className="fa fa-spinner w3-spin"></i>
                                    </h2>
                                }
                                endMessage={
                                    <p style={{textAlign: 'center'}}>
                                        <b>모든 목록을 다 불러 왔습니다.</b>
                                    </p>
                                }
                            >
                                {renderComments}
                            </InfiniteScroll> : renderComments
                    }
                </div>

                {renderModal}
            </div>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form : 'commentForm'
})(withRouter(MainCommentView)));