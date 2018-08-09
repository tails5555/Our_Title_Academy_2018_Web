import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {RequestProfile} from "../profile_image";

const IMAGE_URL = 'http://127.0.0.1:8082/ContextAPI/photo';

class TodayMainRank extends Component {
    constructor(props){
        super(props);
        this.state = { currentIdx : 0 };
    }
    componentWillMount(){
        this.props.fetchCurrentMainRequest();
    }
    componentWillUnmount(){
        this.props.resetFetchCurrentMainRequest();
    }
    handleClickIdx(idx){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        this.setState({
            currentIdx : idx
        })
    }
    handleClickTop(event){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    render(){
        const {requests} = this.props.mainRank;
        const {principal} = this.props.accessUser;
        const {currentIdx} = this.state;
        const requestRendering = requests.map((request, idx) => {
            const {requestDTO, bestTitles, likeCount, hateCount} = request;
            let lc = likeCount;
            let hc = hateCount;
            let percent;
            if(lc + hc !== 0){
                percent = likeCount / (likeCount + hateCount) * 100;
            } else
                percent = 50;
            return(
                <div
                    style={idx !== currentIdx ? {display : 'none'} : {}}
                    key={`rank_main_${idx}`}
                >
                    <div className="w3-card-4 w3-round-large w3-display-container">
                        <img
                            style={{
                                width : '100%',
                                height : 'auto'
                            }}
                            src={`${IMAGE_URL}/request_image/${(requestDTO === null) ? 1 : requestDTO.id}`}
                            className="w3-image w3-round-large"
                        />
                            <div className="w3-container w3-center">
                                <h3 style={{ fontFamily : '궁서체' }}>{bestTitles.length >= 1 ? bestTitles[0].context : '여러분이 제목을 올려주세요.'}</h3>
                            </div>
                            <div className="w3-display-topleft w3-large w3-container w3-padding-small w3-round-medium w3-black w3-opacity">
                                <i className="icon fa-book"></i> {requestDTO.category.name}<br/>
                            </div>
                    </div>
                    <br/>
                    <div className="w3-red w3-round">
                        <div className="w3-container w3-round w3-blue" style={{width:`${percent}%`}}><br/></div>
                        <div className="w3-left w3-text-blue"><i className="icon fa-thumbs-up"></i> { likeCount }</div>
                        <div className="w3-right w3-text-red"><i className="icon fa-thumbs-down"></i> { hateCount }</div>
                    </div>
                    <br/>
                    <div className="w3-panel w3-bottombar w3-topbar w3-border-blue">
                        <span className="image left" style={{width : "200px"}}>
                            <RequestProfile loginId={requestDTO.userId}/>
                        </span>
                        <h3 className="w3-right-align">{requestDTO.intro}</h3>
                        <p className="w3-right-align">
                            <i className="icon fa-calendar"></i> {requestDTO.writtenDate}<br/>
                            <i className="icon fa-star"></i> {likeCount}<br/>
                            <i className="icon fa-eye"></i> {requestDTO.view}<br/>
                        </p>
                    </div>
                    <br/>
                    <h3 className="w3-border-bottom w3-border-light-green"><i className="fas fa-medal"></i> 명예의 제목 전당</h3>
                    <ul className="w3-ul">
                        {
                            bestTitles.map((title, idx) => {
                                let liClass;
                                switch(idx){
                                    case 0 :
                                        liClass = "w3-bar w3-hover-yellow";
                                        break;
                                    case 1 :
                                        liClass = "w3-bar w3-hover-light-gray";
                                        break;
                                    case 2 :
                                        liClass = "w3-bar w3-hover-orange";
                                        break;
                                    default :
                                        liClass = "w3-bar";
                                        break;
                                }
                                return(
                                    <li className={liClass} key={`request_best_${idx}`}>
                                        <span className="image left w3-bar-item w3-circle" style={{
                                            width : '150px'
                                        }}>
                                            <RequestProfile loginId={title.userId} />
                                        </span>
                                            <span className="w3-tag w3-round-large w3-blue">
                                            <i className="icon fa-thumbs-up"></i> {title.likeCount}
                                        </span>
                                            <h4>{title.context}</h4>
                                            <span className="w3-bar-item w3-xlarge w3-right w3-text-black">
                                            #{idx + 1}
                                        </span>
                                    </li>
                                )
                            })
                        }
                        <li className="w3-bar">
                            <span className="image left w3-bar-item w3-circle" style={{
                                width : '200px'
                            }}>
                                <RequestProfile loginId={principal === null || principal.loginId} />
                            </span>
                            <h4>이제 여러분의 차례입니다.</h4>
                                <Link to={`/view_request/${requestDTO.id}/_refresh?id=${requestDTO.category.id}&pg=1`}>
                                    <span className="w3-tag w3-padding-small w3-round-large w3-amber w3-center" style={{cursor : 'pointer'}} onClick={this.handleClickTop.bind(this)}>
                                        <i className="icon fa-pencil"></i> 제목 추가하러 가기
                                    </span>
                                </Link>
                            </li>
                    </ul>
                </div>
            )
        });
        return(
            <section>
                <header id="header">
                    <span className="logo"><strong>Our Title Academy 2018</strong> - TODAY BEST</span>
                </header>
                <br/><br/>
                <header className="major">
                    <h2>오늘의 실시간 제목학원</h2>
                </header>
                {requestRendering}
                <br/>
                <div className="w3-center">
                    {
                        requests.map((request, idx) => {
                            let buttonClass = (currentIdx === idx) ? "w3-button w3-pink" : "w3-button";
                            return <button key={`page_${idx}`} className={buttonClass} onClick={() => this.handleClickIdx(idx)}>{idx+1}등</button>
                        })
                    }
                </div>
            </section>
        )
    }
}
export default TodayMainRank;