import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {MainRequestView} from "../request_component";
import queryString from 'query-string';
class RequestView extends Component{
    componentWillMount(){
        this.props.fetchSelectRequest(this.props.match.params.id);
    }
    render(){
        let paginationModel = queryString.parse(this.props.location.search);
        const {request} = this.props.selectRequest;
        const {titles} = this.props.bestTitles;
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
            </section>
        )
    }
}
export default withRouter(RequestView);