import React, {Component} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {RequestProfile} from '../profile_image';
import InfiniteScroll from 'react-infinite-scroll-component';

const IMAGE_URL = 'http://localhost:8082/ContextAPI/photo';
const SOCKET_URI = 'http://localhost:8082/ota_socket';

class TodayTitleBattle extends Component{
    constructor(props) {
        super(props);
        this.state = {
            titles : [],
            socket : new SockJS(SOCKET_URI),
            stompClient : null,
            renderSize : 20
        };
    };

    componentWillMount(){
        let {principal} = this.props.accessUser;
        this.props.fetchTodayBattleRequest(principal !== null ? principal.loginId : 'ANONYMOUS_USER');

        let {socket, stompClient} = this.state;
        stompClient = Stomp.over(socket);
        this.setState({
            stompClient : stompClient
        });
    }

    componentDidMount(){
        let {stompClient} = this.state;
        if(stompClient !== null){
            stompClient.connect({}, (frame) => {
                stompClient.send("/ota_app_dist/title_first/kang123");
                stompClient.subscribe('/ota_topic/title_view', (message) => {
                    this.setState({
                        titles : JSON.parse(message.body)
                    })
                })
            });
        }
    }

    componentWillUnmount(){
        this.props.resetFetchTodayBattleRequest();
        let {stompClient} = this.state;
        if(stompClient.connected)
            stompClient.disconnect();
    }

    fetchMoreData(){
        const {renderSize} = this.state;
        setTimeout(() => {
            this.setState({
                renderSize : renderSize + 10
            });
        }, 2000);
    }

    render(){
        const { titles, renderSize } = this.state;
        const { request } = this.props.selectRequest;
        const { principal } = this.props.accessUser;
        let requestDTO = request !== null ? request.requestDTO : null;

        let renderRequests =
            (
                <div className="w3-row-padding">
                    <div className="w3-third">
                        <RequestProfile loginId={(requestDTO === null) || requestDTO.userId} />
                        <br/><br/>
                    </div>
                    <div className="w3-twothird">
                        <div className="w3-card-4 w3-round-large w3-display-container">
                            <img
                                style={{
                                    width : '100%',
                                    height : 'auto'
                                }}
                                src={`${IMAGE_URL}/request_image/${(requestDTO === null) ? 1 : requestDTO.id}`}
                                className="w3-image w3-round-large"
                            />
                            <br/><br/>
                            <div className="w3-container">
                                <h3 className="w3-border-bottom w3-border-red">{(requestDTO === null) || requestDTO.intro}</h3>
                                <div dangerouslySetInnerHTML={ {__html: (requestDTO === null || requestDTO.context) } }/>
                                <p className="w3-border-top w3-border-blue">
                                    <br/>
                                    <i className="icon fa-eye"></i> 조회수 <span className="w3-badge w3-light-blue">{(requestDTO === null) || requestDTO.view}</span>
                                    <br/>
                                    <i className="icon fa-calendar"></i> 등록 날짜 <span className="w3-tag w3-light-green w3-round-large">{(requestDTO === null) || requestDTO.writtenDate}</span>
                                    <br/>
                                </p>
                            </div>
                            <div className="w3-display-topleft w3-large w3-container w3-padding-small w3-round-medium w3-black w3-opacity">
                                <i className="icon fa-book"></i> {(requestDTO === null) || (requestDTO.category === null) || requestDTO.category.name}<br/>
                            </div>
                            <br/>
                        </div>
                        <br/>
                    </div>
                </div>
            );

        let renderArray = [];
        if(titles.length > renderSize)
            renderArray = titles.slice(0, renderSize);
        else
            renderArray = titles.slice();

        let renderTitles = renderArray.map((title, idx) => {
            let divClass;
            if(principal !== null){
                divClass = (principal.loginId === title.userId) ? "box w3-pale-blue" : "box";
            }else {
                divClass = "box"
            }
            return(
                <div className={divClass} key={`title_${idx}`}>
                    <div className="w3-panel w3-topbar w3-bottombar w3-border-yellow w3-pale-yellow w3-center">
                        <h4 style={{fontFamily : '궁서체'}}>{title.context}</h4>
                    </div>
                    <br/>
                    <div className="w3-container">
                        <span className="image left" style={{
                            width : '200px'
                        }}>
                            <RequestProfile loginId={title.userId} />
                        </span>
                        <p><i className="icon fa-calendar"></i> {title.writtenDate}</p>
                        {
                            title.likeChecked === true ?
                                <span className="w3-tag w3-round-large w3-blue w3-border-light-blue">
                                    <i className="icon fa-thumbs-up"></i> {title.likeCount} <i className="icon fa-check-circle"></i>
                                </span>
                                :
                                title.likeChecked !== null ?
                                    <span className="w3-tag w3-round-large w3-blue">
                                        <i className="icon fa-thumbs-up"></i> {title.likeCount}
                                    </span>
                                    :
                                    <span className="w3-tag w3-round-large w3-blue">
                                        <i className="icon fa-thumbs-up"></i> {title.likeCount}
                                    </span>
                        }
                        &nbsp;&nbsp;
                        {
                            title.hateChecked === true ?
                                <span className="w3-tag w3-round-large w3-red">
                                    <i className="icon fa-thumbs-down"></i> {title.hateCount} <i className="icon fa-check-circle"></i>
                                </span>
                                :
                                title.hateChecked !== null ?
                                    <span className="w3-tag w3-round-large w3-red">
                                        <i className="icon fa-thumbs-down"></i> {title.hateCount}
                                    </span>
                                    :
                                    <span className="w3-tag w3-round-large w3-red">
                                        <i className="icon fa-thumbs-down"></i> {title.hateCount}
                                    </span>
                        }
                    </div>
                </div>
            )
        });

        return(
            <section>
                <header id="header">
                    <span className="logo"><strong>Our Title Academy 2018</strong> - TITLE BATTLE</span>
                </header>
                <br/><br/>
                <header className="major">
                    <h2>오늘의 제목 학원 배틀</h2>
                </header>
                {renderRequests}
                <h3 className="w3-border-bottom w3-border-blue">
                    <i className="far fa-clock"></i> 실시간 제목 현황
                </h3>
                {
                    renderArray.length > 0 ?
                        <InfiniteScroll
                            dataLength={renderArray.length}
                            next={this.fetchMoreData.bind(this)}
                            hasMore={renderArray.length < titles.length}
                            loader={
                                <h2 className="w3-center">
                                    <i className="fa fa-spinner w3-spin"></i>
                                </h2>
                            }
                            endMessage={
                                <p style={{textAlign: 'center'}}>
                                    <b>모든 목록을 다 불러 왔습니다.</b>
                                </p>
                            }
                        >
                            {renderTitles}
                        </InfiniteScroll> : renderTitles
                }
            </section>
        )
    }
}
export default TodayTitleBattle;