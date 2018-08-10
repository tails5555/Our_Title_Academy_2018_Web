import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {MainRequestView, RequestEmpathyView} from "../request_component";
import {MainCommentView} from "../comment_component";
import queryString from 'query-string';
import {MainTitleView} from "../title_component";
class RequestView extends Component{
    constructor(props){
        super(props);
        this.state = { selectIdx : 1 };
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

    render(){
        const {selectIdx} = this.state;
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
                            <div>
                                <button className="button primary" onClick={() => this.handleClickBlocking(requestDTO.id)}>
                                    <i className="fas fa-ban"></i> 차단하기
                                </button>
                            </div> : ''
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
            </section>
        )
    }
}
export default withRouter(RequestView);