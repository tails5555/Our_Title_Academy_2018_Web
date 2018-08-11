import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import queryString from 'query-string';
import {MainRequestView, RequestEmpathyView} from "../request_component";
import {MainCommentView} from "../comment_component";
import {MainTitleView} from "../title_component";

import "../comment_component/modal.css";

const _quillModules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }]
    ]
}

const _quillFormats = [
    "header",
    "bold", "italic", "underline", "strike", "blockquote", "code-block",
    "list", "script", "bullet", "indent", "direction", "size", "color", "background", "font", "align"
]

class RequestView extends Component{
    constructor(props){
        super(props);
        this.state = { selectIdx : 1, id : -1, intro : null, context : null, show : false };
    }

    handleClickButton(selectIdx){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        this.setState({
            selectIdx : selectIdx
        })
    }

    currentUser(){
        const {principal} = this.props.accessUser;
        let userId;
        if(principal !== null){
            userId = principal.loginId;
        }
        else{
            userId = 'ANONYMOUS_USER';
        }
        return userId
    }

    componentWillMount(){
        this.props.fetchSelectRequest(this.props.match.params.id, this.currentUser());
        this.props.fetchHasTitle(this.props.match.params.id, this.currentUser());
    }

    componentDidMount(){
        this.props.fetchTitleList(this.props.match.params.id, this.currentUser());
    }

    componentWillUnmount(){
        this.props.resetFetchSelectRequest();
        this.props.resetFetchTitleList();
        this.props.resetFetchHasTitle();
        this.props.resetUserUpdateRequest();
        this.props.resetUserDeleteRequest();
        this.props.resetExecuteBlockRequest();
    }

    handleClickBlocking(id){
        var isBlock = window.confirm("현재 사진 요청을 차단합니다. 계속 하시겠습니까?");
        if(isBlock){
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            this.props.executeBlockRequest(id);
        }
    }

    handleClickDelete(requestId){
        let isDelete = window.confirm("현재 님이 작성한 요청 글이 삭제 됩니다. 제목, 댓글 전부 삭제됩니다. 계속 하시겠습니까?");
        if(isDelete){
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            this.props.userDeleteRequest(requestId);
        }
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    handleChangeQuill(value){
        this.setState({
            context : value
        });
    }

    showModal(id, intro, context){
        this.setState({
            id : id,
            intro : intro,
            context : context,
            show : true
        })
    }

    hideModal(){
        this.setState({
            id : -1,
            intro : null,
            context : null,
            show: false
        });
    }

    handleSubmit(event){
        const {principal} = this.props.accessUser;
        const {id, intro, context} = this.state;

        let requestModel = {
            requestId : id,
            intro : intro,
            context : context,
            userId : principal.loginId
        }

        if(intro.trim() === '') {
            alert("요청 제목에는 공백이 존재할 수 없습니다. 다시 입력하세요.");
            event.preventDefault();
        }

        if(context.trim() === '') {
            alert("요청 내용에는 공백이 존재할 수 없습니다. 다시 입력하세요.");
            event.preventDefault();
        }

        else{
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            this.props.userUpdateRequest(requestModel);
            event.preventDefault();
        }
    }

    render(){
        const {selectIdx, show, intro, context} = this.state;
        let paginationModel = queryString.parse(this.props.location.search);
        const {request} = this.props.selectRequest;
        let requestDTO;
        if(request !== null){
            requestDTO = request.requestDTO;
        }
        const {titles} = this.props.bestTitles;
        const {result} = this.props.blockStatus;
        const {principal} = this.props.accessUser;

        if(result === true){
            alert("현재 사진이 차단되었습니다. 다만 사용자가 올렸던 제목, 댓글들은 삭제되지 않습니다.");
            this.props.history.push(`/category/${paginationModel.id}/list${this.props.location.search}`);
        } else if(result === false){
            alert("사진 차단 도중 서버에서 에러가 발생했습니다. 다시 시도 바랍니다.");
            this.props.history.push(`/category/${paginationModel.id}/list${this.props.location.search}`);
        }

        if(this.props.saveStatus.result !== null){
            if(this.props.saveStatus.result === true){
                alert("현재 요청 내용이 수정되었습니다.");
                this.props.history.push(`/view_request/${requestDTO.id}/_refresh${this.props.location.search}`);
            } else {
                alert("현재 요청 내용 수정 도중 오류가 발생했습니다. 다시 시도해주세요.");
                this.props.history.push(`/view_request/${requestDTO.id}/_refresh${this.props.location.search}`);
            }
        }

        if(this.props.deleteStatus.result !== null){
            if(this.props.deleteStatus.result === true){
                alert("현재 요청 내용이 삭제되었습니다.");
                this.props.history.push(`/category/${paginationModel.id}/list${this.props.location.search}`);
            } else {
                alert("현재 요청 내용 삭제 도중 오류가 발생했습니다. 다시 시도해주세요.");
                this.props.history.push(`/category/${paginationModel.id}/list${this.props.location.search}`);
            }
        }

        const showHideClassName = show ? "modal display-block w3-round-large w3-animate-opacity" : "modal display-none w3-animate-opacity";

        let renderModal = (
            <div className={showHideClassName}>
                <section className="modal-main-request">
                    <div className="w3-container w3-teal">
                        <h2 className="w3-text-white">요청 내용을 수정합니다.</h2>
                    </div>
                    <div className="w3-container">
                        <br/>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <input name="intro" type="text" onChange={this.handleChange.bind(this)} placeholder={"수정할 요청 제목을 입력하세요."} value={intro} />
                            <br/>
                            <ReactQuill
                                theme='snow'
                                value={context}
                                modules={_quillModules}
                                formats={_quillFormats}
                                toolbar={false}
                                onChange={this.handleChangeQuill.bind(this)}
                            />
                            <br/>
                            <button type="submit" className="button fit large"><i className="icon fa-pencil"></i> 요청 수정하기</button>
                            <br/><br/>
                            <button type="button" className="button fit large primary" onClick={() => this.hideModal()}><i className="icon fa-times"></i> 취소하기</button>
                        </form>
                    </div>
                </section>
            </div>
        );

        return(
            <section>
                <header id="header">
                    <span className="logo"><strong>Our Title Academy 2018</strong> - REQUEST VIEW</span>
                </header>
                <br/><br/>
                <header className="major">
                    <h2>제목 요청 사진 보기</h2>
                </header>
                <div className="w3-right-align">
                    <Link to={`/category/${paginationModel.id}/list${this.props.location.search}`}>
                        <button className="button primary"><i className="fas fa-arrow-left"></i> 목록으로</button>
                    </Link>
                    <br/><br/>
                    {
                        (principal !== null ? principal.type === 'MANAGER' || principal.type === 'ADMIN' : false) ?
                            <button className="button primary" onClick={() => this.handleClickBlocking(requestDTO.id)}>
                                <i className="fas fa-ban"></i> 차단하기
                            </button> : null
                    }
                    <br/><br/>
                    {
                        (principal !== null ? principal.loginId === (!requestDTO || requestDTO.userId) : false) ?
                            <div>
                                <button className="button primary" onClick={() => this.showModal(!requestDTO || requestDTO.id, !requestDTO || requestDTO.intro, !requestDTO || requestDTO.context)}>
                                    <i className="fas fa-pencil-square"></i> 수정하기
                                </button>
                                &nbsp;&nbsp;
                                <button className="button primary" onClick={() => this.handleClickDelete(requestDTO.id)}>
                                    <i className="fas fa-trash"></i> 삭제하기
                                </button>
                            </div> : null
                    }
                </div>
                <br/>

                <div
                    style={selectIdx !== 1 ? {display : 'none'} : {}}
                    className="w3-animate-opacity"
                >
                    <MainRequestView request={(requestDTO !== undefined) ? requestDTO : null} bestTitles={titles}/>
                    <br/>
                    <RequestEmpathyView
                        pathname={this.props.location.pathname}
                        search={this.props.location.search}
                        requestId={this.props.match.params.id}
                        loginId={(principal !== null) ? principal.loginId : 'ANONYMOUS_USER'}
                        likeCount={request === null || request.likeCount}
                        hateCount={request === null || request.hateCount}
                        likeChecked={request === null || request.likeChecked}
                        hateChecked={request === null || request.hateChecked}
                    />
                    <br/>
                </div>

                <div
                    style={selectIdx !== 2 ? {display : 'none'} : {}}
                    className="w3-animate-opacity"
                >
                    <MainTitleView
                        pathname={this.props.location.pathname}
                        hasTitle={this.props.hasTitle.result}
                        loginId={(principal !== null) ? principal.loginId : 'ANONYMOUS_USER'}
                        requestId={this.props.match.params.id}
                        titles={this.props.titleList !== null ? this.props.titleList.titles : []}
                        search={this.props.location.search}
                    />
                    <br/>
                </div>

                <div
                    style={selectIdx !== 3 ? {display : 'none'} : {}}
                    className="w3-animate-opacity"
                >
                    <MainCommentView
                        pathname={this.props.location.pathname}
                        loginId={(principal !== null) ? principal.loginId : 'ANONYMOUS_USER'}
                        requestId={this.props.match.params.id}
                        search={this.props.location.search}
                    />
                    <br/>
                </div>

                <div className="w3-center">
                    <button className={(selectIdx === 1) ? "w3-button w3-pink" : "w3-button"} onClick={() => this.handleClickButton(1)}>사진과 명예의 전당</button>
                    &nbsp;
                    <button className={(selectIdx === 2) ? "w3-button w3-pink" : "w3-button"} onClick={() => this.handleClickButton(2)}>제목 도전하기</button>
                    &nbsp;
                    <button className={(selectIdx === 3) ? "w3-button w3-pink" : "w3-button"} onClick={() => this.handleClickButton(3)}>댓글 달기</button>
                </div>

                {renderModal}
            </section>
        )
    }
}
export default withRouter(RequestView);