import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
class UserInfo extends Component{
    handleClick(event){
        this.props.history.push('/');
        this.props.logoutFromServer();
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
                    <a href="#" className="image"><img src="../my_image/kimdoohan.jpg" alt="" /></a>
                    {infoMessage}
                </article>
                <button className="button primary fit large" onClick={this.handleClick.bind(this)}>
                    Log Out
                </button>
            </section>
        );
    }
}
export default withRouter(UserInfo);