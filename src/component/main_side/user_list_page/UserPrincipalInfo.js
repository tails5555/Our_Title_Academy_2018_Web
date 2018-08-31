import React, {Component} from 'react';
import {UserProfile} from "../profile_image";
import {withRouter, Link} from 'react-router-dom';
import Chart from "react-google-charts";
class UserPrincipalInfo extends Component{
    constructor(props) {
        super(props);
        this.state = { roleSequence: 2 };
    }
    componentWillMount(){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        const { principal } = this.props.accessUser;
        this.props.fetchUserInfo(principal.type, this.props.match.params === null || this.props.match.params.loginId );
        this.props.fetchRequestStatistic( this.props.match.params === null || this.props.match.params.loginId );
        this.props.fetchTitleStatistic( this.props.match.params === null || this.props.match.params.loginId );
    }
    componentWillUnmount(){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        this.props.resetFetchUserInfo();
        this.props.resetFetchRequestStatistic();
        this.props.resetFetchTitleStatistic();
    }
    componentWillReceiveProps(nextProps){
        const {detail} = (nextProps.principalInfo);
        if(detail !== null){
            switch(detail.user.userType){
                case 'ADMIN' :
                    this.setState({ roleSequence : 0 });
                    break;
                case 'MANAGER' :
                    this.setState({ roleSequence : 1 });
                    break;
                default :
                    break;
            }
        }
    }
    render(){
        const { principal } = this.props.accessUser;
        const { detail, error } = this.props.principalInfo;
        const { roleSequence } = this.state;
        let userContainer;
        let detailContainer;
        if(detail !== null){
            if(detail.user !== null){
                userContainer =
                    <div className="w3-container w3-card-4">
                        <br/>
                        <UserProfile loginId={ detail.user.loginId } />
                        <div className="w3-container w3-center">
                            <h4><b>{ detail.user.loginId }</b></h4>
                            <p>{ detail.user.nickname }</p>
                        </div>
                    </div>
            }
            detailContainer =
                <div className="w3-container w3-card-4" style={ { width : '100%' } }>
                    <br/>
                    <div className="w3-container w3-left-align">
                        <h3 className="w3-border-bottom w3-border-red">회원 아이디</h3>
                        <p>{ detail.user === null || detail.user.loginId }</p>
                        <h3 className="w3-border-bottom w3-border-red">회원 별명</h3>
                        <p>{ detail.user === null || detail.user.nickname }</p>
                        <h3 className="w3-border-bottom w3-border-red">회원 이름</h3>
                        <p>{ detail.name }</p>
                        <h3 className="w3-border-bottom w3-border-red">회원 연령</h3>
                        <p>{ detail.age === null || detail.age.name }</p>
                        <h3 className="w3-border-bottom w3-border-red">회원 거주 지역</h3>
                        <p>{ detail.city === null || detail.city.name }</p>
                        <h3 className="w3-border-bottom w3-border-red">회원 휴대폰 번호</h3>
                        <p>{ detail.phoneNumber }</p>
                        <h3 className="w3-border-bottom w3-border-red">회원 집 전화 번호</h3>
                        <p>{ detail.homeNumber }</p>
                        <h3 className="w3-border-bottom w3-border-red">회원 이메일</h3>
                        <p>{ detail.email }</p>
                        <h3 className="w3-border-bottom w3-border-red">회원 권한</h3>
                        <p>{ detail.user === null || detail.user.userType  }</p>
                    </div>
                </div>
        } else if(error){
            alert(error);
            this.props.history.push('../user_list');
        }

        let tmpRequestData = this.props.myRequestStatistic.statistics.map(statistic => {
            let average = Math.floor(statistic.totalStatus / statistic.count);
            return [statistic.categoryName, statistic.count, statistic.totalStatus, statistic.categoryName, average]
        });

        let requestData = [
            ['버블 카테고리', '요청 올린 수', '요청 좋아요 수', '카테고리', '평균 좋아요 수'],
            ...tmpRequestData
        ];

        const requestOptions = {
            title: `${this.props.match.params === null || this.props.match.params.loginId} 요청에 대한 통계 결과`,
            hAxis: { title: "요청 올린 수" },
            vAxis: { title: "요청 좋아요 수" },
            bubble: { textStyle: { fontSize: 11 } }
        };

        let tmpTitleData = this.props.myTitleStatistic.statistics.map(statistic => {
            let average = Math.floor(statistic.totalStatus / statistic.count);
            return [statistic.categoryName, statistic.count, statistic.totalStatus, statistic.categoryName, average]
        });

        let titleData = [
            ['버블 카테고리', '제목 올린 수', '제목 좋아요 수', '카테고리', '평균 좋아요 수'],
            ...tmpTitleData
        ];

        const titleOptions = {
            title: `${this.props.match.params === null || this.props.match.params.loginId} 제목에 대한 통계 결과`,
            hAxis: { title: "제목 올린 수" },
            vAxis: { title: "제목 좋아요 수" },
            bubble: { textStyle: { fontSize: 11 } }
        };

        return(
            <section>
                <header id="header">
                    <span className="logo"><strong>Our Title Academy 2018</strong> - USER INFO</span>
                </header>
                <br/><br/>
                <header className="major">
                    <h2>회원 정보 열람</h2>
                </header>
                <div className="w3-row-padding">
                    <div className="w3-half">
                        {userContainer}
                        <br/>
                    </div>
                    <div className="w3-half">
                        {detailContainer}
                        <br/>
                    </div>
                </div>
                <Link to="../user_list">
                    <button className="button primary fit large">
                        <i className="icon fa-arrow-left"></i> 회원 이전 목록으로
                    </button>
                </Link>
                <br/><br/>
                {
                     principal.type === 'MANAGER' ?
                        detail === null || detail.user.userType === 'USER' ?
                            <div>
                                <Link to={`/manager/level_up/${detail == null || detail.user.loginId}`}>
                                    <button type="button" className="button primary fit large"><i className="fas fa-level-up-alt"></i> 매니저로 상향 시키기</button>
                                </Link>
                                <br/><br/>
                            </div>
                            :
                            ''
                        : ''
                }
                {
                    (principal.type === 'ADMIN' && detail !== null && detail.user.loginId !== principal.loginId) ?
                        <div>
                            <select name="roleSequence" value={ roleSequence } onChange={(event) => this.setState({ [ event.target.name ] : event.target.value })}>
                                <option value="0">관리자(ADMIN)</option>
                                <option value="1">매니저(MANAGER)</option>
                                <option value="2">회원(USER)</option>
                            </select>
                            <br/>
                            <Link to={`/admin/type_change/${detail == null || detail.user.loginId}/${roleSequence}`}>
                                <button type="button" className="button primary fit large"><i className="fas fa-check"></i> 권한 설정하기</button>
                            </Link>
                            <br/><br/>
                            <div>
                                <button className="button primary fit large"><i className="icon fa-fire"></i> 강퇴 시키기</button>
                                <br/><br/>
                            </div>
                        </div> : ''
                }
                <br/>
                <header className="major">
                    <h2>현재 회원이 올린 요청 통계화</h2>
                </header>
                {
                    requestData.length > 1 ?
                    <Chart
                        chartType="BubbleChart"
                        width="100%"
                        height="400px"
                        data={requestData}
                        options={requestOptions}
                    /> :
                    <div className="w3-panel w3-pale-red w3-round-large">
                        <br/>
                        <span style={{fontSize:'80px', lineHeight:'0.6em', opacity:'0.2'}}><i className="fas fa-times-circle"></i></span>
                        <br/>
                        <h2 className="w3-xlarge"><i>현재까지 등록한 요청들이 없습니다.</i></h2>
                        <p>이 회원이 요청을 추가해야 그래프가 보입니다.</p>
                    </div>
                }
                <br/>
                <header className="major">
                    <h2>현재 회원이 올린 제목 통계화</h2>
                </header>
                {
                    titleData.length > 1 ?
                    <Chart
                        chartType="BubbleChart"
                        width="100%"
                        height="400px"
                        data={titleData}
                        options={titleOptions}
                    /> :
                    <div className="w3-panel w3-pale-red w3-round-large">
                        <br/>
                        <span style={{fontSize:'80px', lineHeight:'0.6em', opacity:'0.2'}}><i className="fas fa-times-circle"></i></span>
                        <br/>
                        <h2 className="w3-xlarge"><i>현재까지 등록한 제목들이 없습니다.</i></h2>
                        <p>이 회원이 제목을 추가해야 그래프가 보입니다.</p>
                    </div>
                }
            </section>
        )
    }
}
export default withRouter(UserPrincipalInfo);