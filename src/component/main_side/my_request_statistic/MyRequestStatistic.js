import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Chart from "react-google-charts";

const IMAGE_URL = 'http://127.0.0.1:8082/ContextAPI/photo';

class MyRequestStatistic extends Component{
    constructor(props){
        super(props);
        this.state = {
            validPage : 1,
            nonValidPage : 1,
        }
    }

    componentWillMount(){
        const {principal} = this.props.accessUser;
        if(principal !== null){
            this.props.fetchValidRequestList(principal.loginId);
            this.props.fetchNonValidRequestList(principal.loginId);
        }
    }

    componentDidMount(){
        const {principal} = this.props.accessUser;
        if(principal !== null){
            this.props.fetchRequestStatistic(principal.loginId);
        }
    }

    topping(){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    toppingWaiting(){
        document.getElementById('waiting').scrollIntoView({
            behavior: 'smooth'
        });
    }

    handleClick(event){
        this.topping();
    }

    handleClickValidPages(event){
        this.topping();
        this.setState({
            validPage : Number(event.target.id)
        });
    }

    handleClickNonValidPages(event){
        this.toppingWaiting();
        this.setState({
            nonValidPage : Number(event.target.id)
        });
    }

    render(){
        const { validPage, nonValidPage } = this.state;
        const { validRequests, nonValidRequests } = this.props.myRequestList;

        const indexOfLastValid = validPage * 6;
        const indexOfFirstValid = indexOfLastValid - 6;

        const indexOfLastNonValid = nonValidPage * 6;
        const indexOfFirstNonValid = indexOfLastNonValid - 6;

        const currentValidRequests = validRequests.slice(indexOfFirstValid, indexOfLastValid);
        const currentNonValidRequests = nonValidRequests.slice(indexOfFirstNonValid, indexOfLastNonValid);

        const validPageNumbers = [];
        for (let i = 1; i <= Math.ceil(validRequests.length / 6); i++) {
            validPageNumbers.push(i);
        }

        const nonValidPageNumbers = [];
        for (let i = 1; i <= Math.ceil(nonValidRequests.length / 6); i++){
            nonValidPageNumbers.push(i);
        }

        const renderValidPageNumbers = (validRequests.length > 0) ? validPageNumbers.map(number => {
            let btnClass = validPage === number ? "w3-button w3-blue" : "w3-button w3-pale-blue";
            return (
                <button
                    className={btnClass}
                    key={`number_${number}`}
                    id={number}
                    onClick={this.handleClickValidPages.bind(this)}
                >
                    {number}
                </button>
            );
        }) : '';

        const renderNonValidPageNumbers = (nonValidRequests.length > 0) ? nonValidPageNumbers.map(number => {
            let btnClass = validPage === number ? "w3-button w3-pink" : "w3-button w3-pale-red";
            return (
                <button
                    className={btnClass}
                    key={`number_${number}`}
                    id={number}
                    onClick={this.handleClickNonValidPages.bind(this)}
                >
                    {number}
                </button>
            );
        }) : '';

        let renderValidRequests = currentValidRequests.length > 0 ? currentValidRequests.map((request, idx)  => {
            return (
                <div className="w3-row w3-panel w3-border w3-pale-blue w3-round-large" key={`valid_${idx}`}>
                    <div className="w3-third w3-center">
                        <br/>
                        <Link className="image w3-responsive" to={`/view_request/${request.id}/_refresh?id=${request.categoryId}&pg=1`}>
                            <img style={{ width:'300px' }} src={`${IMAGE_URL}/request_image/${request.id}`} onClick={this.handleClick.bind(this)} />
                        </Link>
                        <br/>
                    </div>
                    <div className="w3-twothird">
                        <div className="w3-panel w3-topbar w3-bottombar w3-border-yellow w3-pale-yellow w3-center">
                            <h3 style={{fontFamily : '궁서체'}}>{request.bestTitle}</h3>
                        </div>
                        <h3 className="w3-right-align">{request.intro}</h3>
                        <p className="w3-right-align">
                            <i className="icon fa-calendar"></i> {request.writtenDate}<br/>
                            <i className="icon fa-star"></i> {request.likeCount}<br/>
                            <i className="icon fa-comments"></i> {request.commentCount}<br/>
                        </p>
                    </div>
                </div>
            )
        }) : (
            <div className="w3-panel w3-pale-red w3-round-large">
                <br/>
                <span style={{fontSize:'80px', lineHeight:'0.6em', opacity:'0.2'}}><i className="fas fa-times-circle"></i></span>
                <br/>
                <h2 className="w3-xlarge"><i>현재까지 등록한 새로운 요청들이 없습니다.</i></h2>
                <p>제목을 짓기 원하는 사진을 하나 올린 후 확인 바랍니다.</p>
            </div>
        )

        let renderNonValidRequests = currentNonValidRequests.length > 0 ? currentNonValidRequests.map((request, idx) => {
            const divClass = (request.categoryId !== -1) ? "w3-row w3-panel w3-border w3-pale-red w3-round-large" : "w3-row w3-panel w3-border w3-light-gray w3-round-large";
            return (
                <div className={divClass} key={`non_valid_${idx}`}>
                    <div className="w3-third w3-center">
                        <br/>
                        <img className="image w3-responsive" style={{ width:'300px' }} src={`${IMAGE_URL}/request_image/${request.id}`} onClick={this.handleClick.bind(this)} />
                        <br/>
                    </div>
                    <div className="w3-twothird">
                        {
                            (request.categoryId !== -1) ?
                                <div className="w3-panel w3-round-large w3-leftbar w3-pale-yellow">
                                    <br/>
                                    <span style={{fontSize:'40px', lineHeight:'0.6em', opacity:'0.2'}}><i className="fas fa-times-circle"></i></span>
                                    <p><b>이 사진은 정치 성향, 성인물, 종교 유도, 광고 등의 요인이 보여서 차단되었습니다.</b><br/>이러한 사진을 올린다면 법적 조치 가능하오니 이러한 사진을 올리는 행위는 자제 부탁 드립니다.</p>
                                </div> :
                                <div className="w3-panel w3-round-large w3-leftbar w3-pale-yellow">
                                    <br/>
                                    <span style={{fontSize:'40px', lineHeight:'0.6em', opacity:'0.2'}}><i className="fas fa-clock-o"></i></span>
                                    <p><b>이 사진은 아직 매니저가 카테고리 설정을 안 했습니다.</b><br/>매니저의 업무가 많아져서 좀만 더 기다리시길 부탁 드립니다.</p>
                                </div>
                        }
                        <h3 className="w3-right-align">{request.intro}</h3>
                        <p className="w3-right-align">
                            <i className="icon fa-calendar"></i> {request.writtenDate}<br/>
                            <i className="icon fa-star"></i> {request.likeCount}<br/>
                            <i className="icon fa-comments"></i> {request.commentCount}<br/>
                        </p>
                    </div>
                </div>
            );
        }) : (
            <div className="w3-panel w3-pale-red w3-round-large">
                <br/>
                <span style={{fontSize:'80px', lineHeight:'0.6em', opacity:'0.2'}}><i className="fas fa-times-circle"></i></span>
                <br/>
                <h2 className="w3-xlarge"><i>현재까지 요청 허가를 받는 사진이 없습니다.</i></h2>
                <p>사진 요청이 허가되면 위에 등록이 됩니다. 사진 허가를 아직 못 받았다면 아래 개발자 메일로 통보 바랍니다.</p>
            </div>
        )

        const { statistics } = this.props.myRequestStatistic;

        let tmpData = statistics.map(statistic => {
            let average = Math.floor(statistic.totalStatus / statistic.count);
            return [statistic.categoryName, statistic.count, statistic.totalStatus, statistic.categoryName, average]
        });

        let data = [
            ['버블 카테고리', '요청 올린 수', '요청 좋아요 수', '카테고리', '평균 좋아요 수'],
            ...tmpData
        ];

        const options = {
            title: "내 제목에 대한 통계 결과",
            hAxis: { title: "요청 올린 수" },
            vAxis: { title: "요청 좋아요 수" },
            bubble: { textStyle: { fontSize: 11 } }
        };

        return(
            <section>
                <header id="header">
                    <span className="logo"><strong>Our Title Academy 2018</strong> - MY REQUEST STATISTIC</span>
                </header>
                <br/><br/>
                <header className="major">
                    <h2>현재 올라와 있는 요청 목록</h2>
                </header>
                {renderValidRequests}
                <br/>
                <div className="w3-center">
                    {renderValidPageNumbers}
                </div>
                <br/><br/>
                <header id="waiting" className="major">
                    <h2>허가를 기다리는 요청 목록</h2>
                </header>
                {renderNonValidRequests}
                <div className="w3-center">
                    {renderNonValidPageNumbers}
                </div>
                <br/><br/>
                <header className="major">
                    <h2>내가 올린 요청 통계화</h2>
                </header>
                <Chart
                    chartType="BubbleChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                />
                <br/>
            </section>
        )
    }
}
export default MyRequestStatistic;