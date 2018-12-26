import React, { Component, Fragment } from 'react';

import RenderCommentBar from './RenderCommentBar';
import { AlertBoxNote } from "../alert_box";
import { ListPagination } from "../paginate";
import { ModalScreen } from "../modal";
import { CommentSaveForm } from "../form_model";

class MainCommentList extends Component {
    constructor(props){
        super(props);
        this.state = { list : [], loading : false, error : null, page : 1, element : null };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { list, loading, error } = nextProps;
        if(
            list !== prevState.list || loading !== prevState.loading || error !== prevState.error
        ) {
            return {
                list, loading, error
            };
        }
        return null;
    }

    componentDidMount(){
        const { fetchAction } = this.props;
        fetchAction();
    }

    componentWillUnmount(){
        const { resetAction } = this.props;
        resetAction();
    }

    handleClickPaginate = (event) => {
        this.setState({
            page : event.target.id
        });
        window.scroll({
            top : 0,
            left : 0,
            behavior : 'smooth'
        });
    }

    handleClickSetElement = (element) => {
        this.setState({ element });
    }

    handleClickCancelElement = () => {
        this.setState({
            element : null
        });
    }

    render(){
        const { loginId, requestId } = this.props;
        const { list, loading, error, page, element } = this.state;
        const pageSize = 10;

        const startIdx = (page - 1) * pageSize;
        const endIdx = page * pageSize - 1;

        let renderComments = null;

        if(list && !loading){
            if(list.length > 0){
                renderComments =
                    list
                        .filter((comment, idx) => idx >= startIdx && idx <= endIdx)
                        .map((comment, idx) => <RenderCommentBar comment={comment} loginId={loginId} key={`render_comment_bar_${idx}`} handle={loginId === comment.userId ? () => this.handleClickSetElement(comment) : null} />
                    );
            } else {
                renderComments = (
                    <AlertBoxNote
                        id={"has_no_result"}
                        icon={"fas fa-times-circle"}
                        title={"현재 사연에 올린 댓글이 없습니다."}
                        context={"제목에 자신 없으면 댓글로 여러분의 의견을 남겨 보세요. :)"}
                    />
                );
            }
        } else if(error !== null && !loading){
            renderComments = (
                <AlertBoxNote
                    id={"has_error_note"}
                    icon={"fas fa-warning"}
                    title={"댓글 목록을 불러오는 도중 오류가 발생했습니다."}
                    context={`오류 내용 : ${error}\n 계속해서 오류가 발생하면 개발자나 관리자에게 알려주세요 :)`}
                />
            );
        } else {
            renderComments = null;
        }

        return(
            <Fragment>
                <h3 className="w3-border-bottom w3-border-light-green" style={{ marginBottom : '20px' }}>
                    <i className="fas fa-comment" /> 나도 한마디
                </h3>
                { renderComments }
                <div id="comment_pagination_bar" className="w3-center">
                    <ListPagination page={page} size={pageSize} count={list ? list.length : 0} handle={this.handleClickPaginate.bind(this)} />
                </div>
                <ModalScreen title="Loading" opened={loading}>
                    <div className="w3-center w3-padding">
                        <i className="fas fa-sync fa-spin" style={{ fontSize : '80px', margin : '10px' }} />
                        <h4>선택하신 요청의 댓글 목록을 불러오는 중입니다...</h4>
                    </div>
                </ModalScreen>
                <ModalScreen title="댓글 수정" opened={element !== null}>
                    <CommentSaveForm userId={loginId} requestId={requestId} element={element} />
                    <div id="close_button" className="w3-right-align">
                        <button className="w3-button w3-round-large w3-red" onClick={() => this.handleClickCancelElement()}>
                            <i className="icon fa-times" /> 취소
                        </button>
                    </div>
                </ModalScreen>
            </Fragment>
        )
    }
}

export default MainCommentList;