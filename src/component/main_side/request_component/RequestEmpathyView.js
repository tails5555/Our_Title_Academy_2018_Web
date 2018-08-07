import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class RequestEmpathyView extends Component{
    constructor(props){
        super(props);
        this.state = { pathname : props.pathname, search : props.search, requestId : props.requestId, loginId : props.loginId, likeCount : props.likeCount, hateCount : props.hateCount, likeChecked : props.likeChecked, hateChecked : props.hateChecked };
    }

    componentWillReceiveProps(nextProps){
        if (this.props.pathname !== nextProps.pathname){
            this.propsUpdating('pathname', nextProps.pathname);
        }
        if (this.props.search !== nextProps.search){
            this.propsUpdating('search', nextProps.search);
        }
        if (this.props.requestId !== nextProps.requestId){
            this.propsUpdating('requestId', nextProps.requestId);
        }
        if (this.props.loginId !== nextProps.loginId){
            this.propsUpdating('loginId', nextProps.loginId);
        }
        if (this.props.likeCount !== nextProps.likeCount) {
            this.propsUpdating('likeCount', nextProps.likeCount);
        }
        if (this.props.hateCount !== nextProps.hateCount) {
            this.propsUpdating('hateCount', nextProps.hateCount);
        }
        if (this.props.likeChecked !== nextProps.likeChecked){
            this.propsUpdating('likeChecked', nextProps.likeChecked);
        }
        if (this.props.hateChecked !== nextProps.hateChecked){
            this.propsUpdating('hateChecked', nextProps.hateChecked);
        }
    }

    propsUpdating(types, value){
        let self = this;
        self.setState({
            [types] : value
        })
    }

    render(){
        const { pathname, search, requestId, loginId, likeCount, hateCount, likeChecked, hateChecked } = this.state;
        let lc = (likeCount === true) ? 0 : likeCount;
        let hc = (hateCount === true) ? 0 : hateCount;

        let percent;
        if(lc + hc !== 0){
            percent = likeCount / (likeCount + hateCount) * 100;
        } else
            percent = 50;

        return(
            <div>
                <h3 className="w3-border-bottom w3-border-purple"><i className="fas fa-check-circle"></i> 전체적인 사진과 내용을 평가해 봅시다!</h3>
                <div className="w3-red w3-round">
                    <div className="w3-container w3-round w3-blue" style={{width:`${percent}%`}}><br/></div>
                    <div className="w3-left w3-text-blue"><i className="icon fa-thumbs-up"></i> { likeCount }</div>
                    <div className="w3-right w3-text-red"><i className="icon fa-thumbs-down"></i> { hateCount }</div>
                </div>
                <br/>
                <div className="w3-center">
                {
                    loginId === 'ANONYMOUS_USER' ?
                        <div className="w3-panel w3-yellow w3-round-xlarge">
                            <br/>
                            <h3><i className="fas fa-key"></i> 사진 공감 참여를 위해 로그인이 필요합니다.</h3>
                            <p>사진 공감 참여를 원하면 로그인을 해야 합니다. 제목 공감도 마찬가지로 로그인을 진행해야 참여 가능합니다.</p>
                        </div> : ''
                }
                {
                    likeChecked === true ?
                        <Link to={`${pathname}/request_empathy/${requestId}/${loginId}/like${search}`}>
                            <button className="w3-button w3-blue">
                                <i className="icon fa-thumbs-up"></i> {likeCount} <i className="icon fa-check-circle"></i>
                            </button>
                        </Link> :
                        likeChecked !== null ?
                            <Link to={`${pathname}/request_empathy/${requestId}/${loginId}/like${search}`}>
                                <button className="w3-button w3-blue">
                                    <i className="icon fa-thumbs-up"></i> {likeCount}
                                </button>
                            </Link>
                            :
                            ''
                }
                &nbsp;&nbsp;
                {
                    hateChecked === true ?
                        <Link to={`${pathname}/request_empathy/${requestId}/${loginId}/hate${search}`}>
                            <button className="w3-button w3-red">
                                <i className="icon fa-thumbs-down"></i> {hateCount} <i className="icon fa-check-circle"></i>
                            </button>
                        </Link> :
                        hateChecked !== null ?
                            <Link to={`${pathname}/request_empathy/${requestId}/${loginId}/hate${search}`}>
                                <button className="w3-button w3-red">
                                    <i className="icon fa-thumbs-down"></i> {hateCount}
                                </button>
                            </Link> :
                            ''
                }
                </div>
            </div>

        )
    }
}
export default RequestEmpathyView;