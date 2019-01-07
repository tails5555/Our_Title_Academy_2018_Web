import React, { Component, Fragment } from 'react';
import Slider from "react-slick";
import { RankRequestCard } from "../unit_component/request";
import {AlertBoxNote} from "../unit_component/alert_box";
import {MajorTitleHeader} from "../unit_component/header";

const ONE_SECOND_MILLS = 3600;
const ONE_MINUTE_MILLS = 60 * ONE_SECOND_MILLS;

// 5분을 주기로 랭킹 목록이 바뀌는 컴포넌트로 구성하였습니다.

const settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    rows: 1,
    slidesToScroll: 1,
    arrows : false
};

class TodayRankCardView extends Component {
    constructor(props){
        super(props);
        this._isMounted = false;
        this._interval = null;
        this.state = { list : [], loading : false, error : null, starting : true };
    }

    componentDidMount() {
        const { rankAction } = this.props;
        const { fetchBriefRankRequests } = rankAction;
        if(!this._isMounted){
            fetchBriefRankRequests();
        }
        this._interval = setInterval(this.intervalFetchRequests, ONE_MINUTE_MILLS * 5);
    }

    intervalFetchRequests = () => {
        const { rankAction } = this.props;
        const { fetchBriefRankRequests, resetFetchBriefRankRequests } = rankAction;
        resetFetchBriefRankRequests();
        fetchBriefRankRequests();
        this._isMounted = true;
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { list, loading, error } = prevState;
        const { rank } = nextProps;
        if(
            rank && (list !== rank.list || loading !== rank.loading || error !== rank.error)
        ) {
            return {
                list : rank.list, loading : rank.loading, error : rank.error
            }
        }
        return null;
    }

    componentWillUnmount() {
        if(this._interval){
            clearInterval(this._interval);
        }
    }

    render(){
        const { list, loading, error } = this.state;
        let renderRanking = null;
        if(loading){
            renderRanking = (
                <div className="w3-panel w3-deep-orange w3-round-large w3-center">
                    <h5 className="w3-text-white">
                        <i className="fas fa-spinner fa-spin" /> Loading
                    </h5>
                    <h6 className="w3-text-white">랭킹을 불러오는 중입니다...</h6>
                </div>
            );
        } else if(error){
            renderRanking = (
                <AlertBoxNote
                    id={"has_error_alert"}
                    icon={"fas fa-warning"}
                    title={"실시간 랭킹을 불러오는 도중 오류가 발생 했습니다."}
                    context={`오류 내용 : ${error}\n 계속해서 오류가 발생하면 개발자나 관리자에게 알려주세요 :)`}
                />
            );
        } else {
            renderRanking = list.length > 0 ?
                (
                    <Slider {...settings}>
                        {
                            list.map((request, idx) => <RankRequestCard request={request} key={`request_rank_${idx}`}/>)
                        }
                    </Slider>
                ) : (
                    <AlertBoxNote
                        id={"has_no_result"}
                        icon={"fas fa-times-circle"}
                        title={"랭킹에 올라온 제목학원이 없습니다."}
                        context={"제목 학원 학우들이 관심을 가질 때까지 기다려주세요 :)"}
                    />
                );
        }
        return(
            <Fragment>
                <section id="today_best">
                    <MajorTitleHeader title={'Best Requests'} />
                    { renderRanking }
                </section>
            </Fragment>
        );
    }
}

export default TodayRankCardView;