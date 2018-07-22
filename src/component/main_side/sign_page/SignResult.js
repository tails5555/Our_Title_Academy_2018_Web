import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import accessError from './access_error.jpg';
class SignResult extends Component {
    pushing(){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    handleClickHome(event){
        this.pushing();
        this.props.history.push('/');
    }
    handleClickSign(event){
        this.pushing();
        this.props.history.push('/account/sign_up');
    }
    render(){
        const { detail, error } = this.props.detailResult;
        let resultRender;
        if(detail !== null){
            resultRender =
                <article className="w3-container">
                    <div class="w3-panel w3-border-left w3-pale-blue w3-border-blue">
                        <h2><i className="icon fa-check-circle-o" /> 회원 가입이 정상적으로 완료 되었습니다.</h2>
                    </div>
                    <div className="w3-panel w3-leftbar w3-left-align">
                        <p><i className="fa fa-quote-right w3-xxlarge" /><br/>
                            <b className="w3-serif w3-xlarge">
                                아래와 같은 정보로 가입이 되어 있는지 확인 바랍니다.
                            </b>
                            <br/>
                            만의 하나로 아래와 같은 정보가 나오지 않으면 개발자에게 즉시 조치를 취하길 바랍니다.<br/>
                            그리고 새로고침(F5) 버튼을 누르지 않고 이동해주시길 바랍니다. 한 번 확인한 이후 없어집니다.
                        </p>
                    </div>
                    <br/>
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
                            <p>회원(USER)</p>
                        </div>
                    </div>
                    <br/>
                    <button type="button" className="button primary fit large" onClick={this.handleClickHome.bind(this)}>홈 으로</button>
                </article>
        } else if(error !== null) {
            resultRender =
                <article className="w3-container">
                    <div class="w3-panel w3-border-left w3-pale-red w3-border-red">
                        <h2><i className="icon exclamation-triangle" /> 회원 가입 중 회원 Server에 예상치 못한 에러가 발생했습니다.</h2>
                    </div>
                    <div className="w3-panel w3-leftbar w3-left-align">
                        <p><i className="fa fa-quote-right w3-xxlarge" /><br/>
                            <b className="w3-serif w3-xlarge">
                                회원 정보를 서버로 전송하는 도중 예기치 못 한 오류가 발생했습니다.
                            </b>
                            <br/>
                            회원의 잘못은 없습니다. 최대한 빠른 시일 내로 조치하겠습니다.
                        </p>
                    </div>
                    <br/>
                    <button type="button" className="button primary fit large" onClick={this.handleClickHome.bind(this)}>홈 으로</button>
                </article>
        } else {
            resultRender =
                <article className="w3-container w3-center">
                    <img className="w3-image" src={accessError} />
                    <div className="w3-panel w3-border-left w3-pale-yellow w3-border-yellow">
                        <h2><i className="icon fa-question-circle-o" /> 회원 가입을 진행 하셨나요?</h2>
                    </div>
                    <div className="w3-panel w3-leftbar w3-left-align">
                        <p><i className="fa fa-quote-right w3-xxlarge" /><br/>
                            <b className="w3-serif w3-xlarge">
                                회원 가입 과정을 진행하셔야 합니다.
                            </b>
                            <br/>
                            아래 버튼을 클릭하여 다시 시도하시길 바랍니다.<br/>
                            회원 가입 진행을 했음에도 이 창이 나오면 개발자의 메일 링크를 클릭하여 조치를 취하시길 바랍니다.<br/>
                        </p>
                    </div>
                    <button type="button" className="button primary fit large" onClick={this.handleClickHome.bind(this)}>홈 으로</button>
                    <br /><br />
                    <button type="button" className="button primary fit large" onClick={this.handleClickSign.bind(this)}>가입 양식으로</button>
                </article>
        }
        return (
            <section>
                <header id="header">
                    <span class="logo"><strong>Our Title Academy 2018</strong> - SIGN UP RESULT</span>
                </header>
                <br/><br/>
                <header className="major">
                    <h2>회원 가입 결과</h2>
                </header>
                {resultRender}
            </section>
        )
    }
}
export default withRouter(SignResult);