import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {MainRequestView, RequestEmpathyView} from "../request_component";
import queryString from 'query-string';
import {MainTitleView} from "../title_component";
class RequestView extends Component{
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
    }

    render(){
        let paginationModel = queryString.parse(this.props.location.search);
        const {request} = this.props.selectRequest;
        let requestDTO;
        if(request !== null){
            requestDTO = request.requestDTO;
        }
        const {titles} = this.props.bestTitles;
        const {principal} = this.props.accessUser;
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
                    <Link to={`/category/${paginationModel.id}/list${this.props.location.search}`}><button className="button primary">목록으로</button></Link>
                </div>
                <br/>
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
                <MainTitleView
                    pathname={this.props.location.pathname}
                    hasTitle={this.props.hasTitle.result}
                    loginId={(principal !== null) ? principal.loginId : 'ANONYMOUS_USER'}
                    requestId={this.props.match.params.id}
                    titles={this.props.titleList !== null ? this.props.titleList.titles : []}
                    search={this.props.location.search}
                />
            </section>
        )
    }
}
export default withRouter(RequestView);