import React, {Component} from 'react';
import {UserProfile} from "../profile_image";
import {withRouter, Link} from 'react-router-dom';
class UserPrincipalInfo extends Component{
    componentDidMount(){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        const { principal } = this.props.accessUser;
        this.props.fetchUserInfo(principal.type, this.props.match.params === null || this.props.match.params.loginId );
    }
    componentWillUnmount(){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        this.props.resetFetchUserInfo();
    }
    render(){
        const { principal } = this.props.accessUser;
        const { detail, error } = this.props.principalInfo;
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
                                <Link to={`/manager/level_up/${detail == null || detail.user.loginId}/_redirect`}>
                                    <button className="button primary fit large"><i className="fas fa-level-up-alt"></i> 매니저로 상향 시키기</button>
                                </Link>
                                <br/><br/>
                            </div>
                            :
                            ''
                        : ''
                }
                {
                    principal.type === 'ADMIN' ?
                        <div>
                            <button className="button primary fit large"><i className="icon fa-fire"></i> 강퇴 시키기</button>
                            <br/><br/>
                        </div> : ''
                }
            </section>
        )
    }
}
export default withRouter(UserPrincipalInfo);