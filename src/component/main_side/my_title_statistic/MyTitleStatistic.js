import React, {Component} from 'react';
import Chart from "react-google-charts";

const IMAGE_URL = 'http://127.0.0.1:8082/ContextAPI/photo';

class MyTitleStatistic extends Component{
    constructor(props){
        super(props);
        this.state = {
            titlePage : 1
        }
    }

    componentWillMount(){
        const {principal} = this.props.accessUser;
        if(principal !== null){
            this.props.fetchMyTitleList(principal.loginId);
            this.props.fetchMyTitleStatistic(principal.loginId);
        }
    }

    componentWillUnmount(){
        this.props.resetFetchMyTitleList();
        this.props.resetFetchMyTitleStatistic();
    }

    topping(){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    handleClickTitlePages(event){
        this.topping();
        this.setState({
            titlePage : Number(event.target.id)
        });
    }

    render(){
        const { titlePage } = this.state;
        const { titles } = this.props.titleList;

        const indexOfLastPage = titlePage * 6;
        const indexOfFirstPage = indexOfLastPage - 6;

        const currentPageTitles = titles.slice(indexOfFirstPage, indexOfLastPage);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(titles.length / 6); i++) {
            pageNumbers.push(i);
        }

        const renderPageRender = (currentPageTitles.length > 0) ? pageNumbers.map(number => {
            let btnClass = titlePage === number ? "w3-button w3-blue" : "w3-button w3-pale-blue";
            return (
                <button
                    className={btnClass}
                    key={`number_${number}`}
                    id={number}
                    onClick={this.handleClickTitlePages.bind(this)}
                >
                    {number}
                </button>
            );
        }) : '';

        let myTitleRender = currentPageTitles.length > 0 ? currentPageTitles.map((title, idx)  => {
            let percent;
            if(title.likeCount + title.hateCount !== 0){
                percent = title.likeCount / (title.likeCount + title.hateCount) * 100;
            } else
                percent = 50;

            return (
                <div className="w3-row w3-panel w3-border w3-light-gray w3-round-large" key={`title_${idx}`}>
                    <div className="w3-third w3-center">
                        <br/>
                            <img className="image w3-responsive" style={{ width:'300px' }} src={`${IMAGE_URL}/request_image/${title.requestId}`} />
                        <br/>
                    </div>
                    <div className="w3-twothird">
                        <div className="w3-panel w3-topbar w3-bottombar w3-border-yellow w3-pale-yellow w3-center">
                            <h3 style={{fontFamily : '궁서체'}}>{title.context}</h3>
                        </div>
                        <p className="w3-right-align">
                            <i className="icon fa-calendar"></i> {title.writtenDate}<br/>
                        </p>
                        <div className="w3-red w3-round">
                            <div className="w3-container w3-round w3-blue" style={{width:`${percent}%`}}><br/></div>
                            <div className="w3-left w3-text-blue"><i className="icon fa-thumbs-up"></i> { title.likeCount }</div>
                            <div className="w3-right w3-text-red"><i className="icon fa-thumbs-down"></i> { title.hateCount }</div>
                        </div>
                    </div>
                </div>
            )
        }) : (
            <div className="w3-panel w3-pale-red w3-round-large">
                <br/>
                <span style={{fontSize:'80px', lineHeight:'0.6em', opacity:'0.2'}}><i className="fas fa-times-circle"></i></span>
                <br/>
                <h2 className="w3-xlarge"><i>현재까지 등록한 제목들이 없습니다.</i></h2>
                <p>제목을 올린 후 확인 바랍니다.</p>
            </div>
        );

        const { statistics } = this.props.myTitleStatistic;

        let tmpData = statistics.map(statistic => {
            let average = Math.floor(statistic.totalStatus / statistic.count);
            return [statistic.categoryName, statistic.count, statistic.totalStatus, statistic.categoryName, average]
        });

        let data = [
            ['버블 카테고리', '제목 올린 수', '제목 좋아요 수', '카테고리', '평균 좋아요 수'],
            ...tmpData
        ];

        const options = {
            title: "내 제목에 대한 통계 결과",
            hAxis: { title: "제목 올린 수" },
            vAxis: { title: "제목 좋아요 수" },
            bubble: { textStyle: { fontSize: 11 } }
        };

        return(
            <section>
                <header id="header">
                    <span className="logo"><strong>Our Title Academy 2018</strong> - MY TITLE STATISTIC</span>
                </header>
                <br/><br/>
                <header className="major">
                    <h2>현재 내가 작성한 제목 목록</h2>
                </header>
                {myTitleRender}
                <br/>
                <div className="w3-center">
                    {renderPageRender}
                </div>
                <br/><br/>
                <header className="major">
                    <h2>내가 올린 제목 통계화</h2>
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
export default MyTitleStatistic;