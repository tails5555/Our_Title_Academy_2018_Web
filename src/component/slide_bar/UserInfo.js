import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import defaultProfile from '../resource_image/default_profile.png';

const RESOURCE_ROOT_URL = 'http://127.0.0.1:8081/UserAPI/auth/resource/profile';

class UserInfo extends Component{
    handleClickLogout(event){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        this.props.history.push('/');
        this.props.logoutFromServer();
    }

    handleClickProfileInfo(event){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    componentWillMount(){
        this.props.fetchProfileFromServer();
    }

    componentWillUnmount(){
        this.props.resetFetchProfile();
    }

    render(){
        const { principal, loading, error } = this.props.accessUser;
        let infoMessage;
        if(loading) {
            infoMessage = <p>사용자 정보를 불러오는 중입니다...</p>
        }else if(error){
            infoMessage = <p>사용자 정보를 불러오는 도중 오류가 발생했습니다.</p>
        }else {
            let nickname = (principal === null) || principal.nickname;
            let accessTime = (principal === null) || principal.accessTime;
            infoMessage =
                <div>
                    <p><b>{ (nickname === null) || nickname } 님</b>, 제목을 지어주세요!!!</p>
                    <p>접속 시간 : { (accessTime === null) || accessTime }</p>
                </div>
        }

        return(
            <section id="user_info" className="mini-posts alt">
                <article>
                    <Link to='/my/profile_change' className="image"><img src={ (this.props.myProfile.profile !== null && this.props.myProfile.profile !== '') ? `${RESOURCE_ROOT_URL}/image_profile/${(principal === null) || (principal.loginId)}` : defaultProfile } alt="" onClick={this.handleClickProfileInfo.bind(this)}/></Link>
                    {infoMessage}
                </article>
                <button className="button primary fit large" onClick={this.handleClickLogout.bind(this)}>
                    Log Out
                </button>
            </section>
        );
    }
}
export default withRouter(UserInfo);