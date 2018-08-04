import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {MainRequestView} from "../request_component";
import queryString from 'query-string';
import {MainTitleView} from "../title_component";
class RequestView extends Component{
    componentWillMount(){
        const {principal} = this.props.accessUser;
        if(principal !== null){
            this.props.fetchTitleList(this.props.match.params.id, principal.loginId);
            this.props.fetchHasTitle(this.props.match.params.id, principal.loginId);
        }
        else{
            this.props.fetchTitleList(this.props.match.params.id, 'ANONYMOUS_USER');
            this.props.fetchHasTitle(this.props.match.params.id, 'ANONYMOUS_USER');
        }
        this.props.fetchSelectRequest(this.props.match.params.id);
    }

    componentWillUnmount(){
        this.props.resetFetchSelectRequest();
        this.props.resetFetchTitleList();
        this.props.resetFetchHasTitle();
    }

    render(){
        let paginationModel = queryString.parse(this.props.location.search);
        const {request} = this.props.selectRequest;
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
                <MainRequestView request={request} bestTitles={titles}/>
                <br/>
                <MainTitleView pathname={this.props.location.pathname} search={this.props.location.search} loginId={(principal !== null) ? principal.loginId : 'ANONYMOUS_USER'} titles={this.props.titleList !== null ? this.props.titleList.titles : []} hasTitle={this.props.hasTitle.result}/>
            </section>
        )
    }
}
export default withRouter(RequestView);