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
            loginId : '',
            titleId : 0,
            titles : [],
            hasTitle : null,
            context : '',
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
            loginId : principal !== null ? principal.loginId : 'ANONYMOUS_USER',
            stompClient : stompClient
        });
    }

    componentDidMount(){
        let {principal} = this.props.accessUser;
        let {stompClient} = this.state;
        let loginId = principal !== null ? principal.loginId : 'ANONYMOUS_USER';

        if(stompClient !== null){
            stompClient.connect({}, (frame) => {
                stompClient.send(`/ota_app_dist/title_list/${loginId}`);
                stompClient.subscribe('/ota_topic/title_viewer', (message) => {
                    const socketObj = JSON.parse(message.body);
                    const {titles} = this.state;
                    let stateArray = titles.map(title => {
                        return {
                            idx : title.id,
                            likeChecked : title.likeChecked === null ? null : title.likeChecked,
                            hateChecked : title.hateChecked === null ? null : title.hateChecked
                        }
                    });
                    let titleArray = socketObj.titles.slice();
                    let newArray = [];
                    if(loginId !== socketObj.userId){
                        if(loginId !== 'ANONYMOUS_USER'){
                            newArray = titleArray.map(title => {
                                let lk = false, ht = false;
                                for(var k=0;k<stateArray.length;k++){
                                    if(title.id === stateArray[k].id){
                                        lk = (loginId === socketObj.userId) ? title.likeChecked : stateArray[k].likeChecked;
                                        ht = (loginId === socketObj.userId) ? title.hateChecked : stateArray[k].hateChecked;
                                        break;
                                    }
                                }
                                return {
                                    ...title, likeChecked : lk, hateChecked : ht
                                }
                            });
                        } else {
                            newArray = titleArray;
                        }
                    }

                    this.setState({
                        loginId : loginId,
                        titles : (loginId === socketObj.userId) ? titleArray : newArray
                    })

                    if(loginId !== 'ANONYMOUS_USER'){
                        const {titleId, hasTitle, context} = this.state;
                        this.setState({
                            titleId : (loginId === socketObj.userId) ? socketObj.titleId : titleId,
                            hasTitle : (loginId === socketObj.userId) ? socketObj.hasTitle : hasTitle,
                            context : (loginId === socketObj.userId) ? socketObj.context : context
                        })
                    }
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

    handleSubmit(event){
        const { context, loginId } = this.state;
        const { request } = this.props.selectRequest;
        let requestDTO = request !== null ? request.requestDTO : null;

        if(context.trim() === ''){
            alert("제목에는 공백이 저장될 수 없습니다. 다시 시도 바랍니다.");
            event.preventDefault();
            return;
        }

        if(requestDTO === null){
            alert("서버 측에서 오늘의 요청을 받지 못 하였습니다. 다시 시도 바랍니다.");
            event.preventDefault();
            return;
        }

        let {stompClient} = this.state;
        if(stompClient !== null){
            stompClient.send(`/ota_app_dist/title_saving`, {}, JSON.stringify({
                userId : loginId,
                requestId : requestDTO.id,
                context : context
            }));
        }
        event.preventDefault();
    }

    handleClickDelete(event){
        let {stompClient} = this.state;
        const {loginId, titleId} = this.state;
        let isDelete = window.confirm("님이 현재 올린 제목을 삭제합니다. 계속 하시겠습니까?");
        if(isDelete){
            stompClient.send(`/ota_app_dist/title_deleting/${titleId}/${loginId}`, {}, {});
        }
    }

    handleClickEmpathy(titleId, method){
        let {stompClient} = this.state;
        const {loginId} = this.state;
        if(loginId === 'ANONYMOUS_USER')
            alert("공감 체크는 로그인을 진행한 후에 가능합니다. 다시 시도 바랍니다.");
        stompClient.send(`/ota_app_dist/title_empathy/${titleId}/${method}/${loginId}`, {}, {});
    }

    handleClickSynchronous(event){
        let {principal} = this.props.accessUser;
        let {stompClient} = this.state;
        let loginId = principal !== null ? principal.loginId : 'ANONYMOUS_USER';

        if(stompClient !== null){
            stompClient.send(`/ota_app_dist/title_list/${loginId}`);
        }
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render(){
        const { loginId, titles, renderSize, context, hasTitle } = this.state;
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
                divClass = (principal.loginId === title.userId) ? "box w3-pale-blue w3-animate-left" : "box w3-animate-left";
            }else {
                divClass = "box w3-animate-left"
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
                                <span className="w3-tag w3-round-large w3-blue w3-border-light-blue" style={{cursor : 'pointer'}} onClick={() => this.handleClickEmpathy(title.id, 'LIKE')}>
                                    <i className="icon fa-thumbs-up"></i> {title.likeCount} <i className="icon fa-check-circle"></i>
                                </span>
                                :
                                loginId !== 'ANONYMOUS_USER' ?
                                    <span className="w3-tag w3-round-large w3-blue" style={{cursor : 'pointer'}} onClick={() => this.handleClickEmpathy(title.id, 'LIKE')}>
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
                                <span className="w3-tag w3-round-large w3-red" style={{cursor : 'pointer'}} onClick={() => this.handleClickEmpathy(title.id, 'HATE')}>
                                    <i className="icon fa-thumbs-down"></i> {title.hateCount} <i className="icon fa-check-circle"></i>
                                </span>
                                :
                                loginId !== 'ANONYMOUS_USER' ?
                                    <span className="w3-tag w3-round-large w3-red" style={{cursor : 'pointer'}} onClick={() => this.handleClickEmpathy(title.id, 'HATE')}>
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
                <br/>
                {
                    loginId === 'ANONYMOUS_USER' ?
                        <div className="w3-panel w3-round-medium w3-pale-red">
                            <h3><i className="fas fa-exclamation-triangle"></i> 제목을 등록할 수 없습니다.</h3>
                            <p>제목을 등록하기 위해 로그인을 진행하시길 바랍니다.</p>
                        </div> :
                        hasTitle === false ?
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <h4><i className="icon fa-pencil"></i> 제목을 등록합니다.</h4>
                                <input type="text" value={context} name="context" onChange={this.handleChange.bind(this)} placeholder="제목은 65자 이내로 입력하세요." />
                                <br/>
                                <button type="submit" className="button fit large">등록하기</button>
                                <br/><br/>
                                <button type="button" className="button fit large" onClick={this.handleClickSynchronous.bind(this)}>
                                    <i className="icon fa-refresh"></i> 공감 체크 동기화
                                </button>
                            </form> :
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <h4><i className="icon fa-eraser"></i> 제목을 수정합니다.</h4>
                                <input type="text" value={context} name="context" onChange={this.handleChange.bind(this)} placeholder="제목은 65자 이내로 입력하세요." />
                                <br/>
                                <button type="submit" className="button fit large">수정하기</button>
                                <br/><br/>
                                <button type="button" className="button primary fit large" onClick={this.handleClickDelete.bind(this)}>
                                    <i className="icon fa-trash"></i> 제목 삭제하기
                                </button>
                                <br/><br/>
                                <button type="button" className="button fit large" onClick={this.handleClickSynchronous.bind(this)}>
                                    <i className="icon fa-refresh"></i> 공감 체크 동기화
                                </button>
                            </form>
                }
                <br/>
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