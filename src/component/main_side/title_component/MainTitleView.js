import React, {Component} from 'react';
import {UserProfile, RequestProfile} from "../profile_image";
import {renderField} from "../../form";
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
class MainTitleView extends Component{
    constructor(props){
        super(props);
        this.state = { titles : [], hasTitle : this.props.hasTitle, loginId : this.props.loginId, pathname : this.props.pathname, search : this.props.search };
    }

    componentWillReceiveProps(nextProps){
        if (this.props.titles !== nextProps.titles) {
            this.propsUpdating('titles', nextProps.titles);
        }
        if (this.props.hasTitle !== nextProps.hasTitle) {
            this.propsUpdating('hasTitle', nextProps.hasTitle);
        }
        if (this.props.loginId !== nextProps.loginId){
            this.propsUpdating('loginId', nextProps.loginId);
        }
        if (this.props.pathname !== nextProps.pathname){
            this.propsUpdating('pathname', nextProps.pathname);
        }
        if (this.props.search !== nextProps.search){
            this.propsUpdating('search', nextProps.search);
        }
    }

    propsUpdating(types, value){
        let self = this;
        self.setState({
            [types] : value
        })
    }

    render(){
        const {titles, hasTitle, loginId, pathname, search} = this.state;
        if(loginId !== 'ANONYMOUS_USER'){
            if(hasTitle !== null){
                const initData = {
                    context : hasTitle.context
                };
                this.props.initialize(initData);
            }
        }
        return(
            <div>
                <h3 className="w3-border-bottom w3-border-light-blue"><i class="fas fa-box-open"></i> 현재까지 올라온 제목 목록들</h3>
                <br/>
                {
                    loginId === 'ANONYMOUS_USER' ?
                        <div className="w3-panel w3-round-medium w3-pale-red">
                            <h3><i class="fas fa-exclamation-triangle"></i> 제목을 등록할 수 없습니다.</h3>
                            <p>제목을 등록하기 위해 로그인을 진행하시길 바랍니다.</p>
                        </div> :
                        hasTitle === '' ?
                            <form>
                                <h4><i class="icon fa-pencil"></i> 제목을 등록합니다.</h4>
                                <Field type="text" placeholder="제목은 65자 이내로 입력하세요." name="context" component={renderField} />
                            </form> :
                            <form>
                                <h4><i class="icon fa-eraser"></i> 제목을 수정합니다.</h4>
                                <Field type="text" placeholder="제목은 65자 이내로 입력하세요." name="context" component={renderField} />
                            </form>
                }
                <ul className="w3-ul">
                    {
                        titles.map((title, idx) => {
                            let liClass;
                            if(loginId === title.userId){
                                liClass = "w3-bar w3-pale-blue";
                            }else {
                                liClass = "w3-bar"
                            }
                            return(
                                <li className={liClass} key={`title_${idx}`}>
                                    <span className="image left w3-bar-item w3-circle" style={{
                                        width : '150px'
                                    }}>
                                        <RequestProfile loginId={title.userId} />
                                    </span>
                                    {
                                        title.likeChecked === true ?
                                            <Link to={`${pathname}/title_empathy/${title.id}/${loginId}/like${search}`}>
                                                <span className="w3-tag w3-round-large w3-blue w3-border-light-blue">
                                                    <i className="icon fa-thumbs-up"></i> {title.likeCount} <i className="icon fa-check-circle"></i>
                                                </span>
                                            </Link> :
                                            title.likeChecked !== null ?
                                                <Link to={`${pathname}/title_empathy/${title.id}/${loginId}/like${search}`}>
                                                    <span className="w3-tag w3-round-large w3-blue">
                                                        <i className="icon fa-thumbs-up"></i> {title.likeCount}
                                                    </span>
                                                </Link>
                                                    :
                                                <span className="w3-tag w3-round-large w3-blue">
                                                    <i className="icon fa-thumbs-up"></i> {title.likeCount}
                                                </span>
                                    }

                                    &nbsp;&nbsp;
                                    {
                                        title.hateChecked === true ?
                                            <Link to={`${pathname}/title_empathy/${title.id}/${loginId}/hate${search}`}>
                                                <span className="w3-tag w3-round-large w3-red">
                                                    <i className="icon fa-thumbs-up"></i> {title.hateCount} <i className="icon fa-check-circle"></i>
                                                </span>
                                            </Link> :
                                            title.hateChecked !== null ?
                                                <Link to={`${pathname}/title_empathy/${title.id}/${loginId}/hate${search}`}>
                                                    <span className="w3-tag w3-round-large w3-red">
                                                        <i className="icon fa-thumbs-up"></i> {title.hateCount}
                                                    </span>
                                                </Link> :
                                                <span class="w3-tag w3-round-large w3-red">
                                                    <i className="icon fa-thumbs-up"></i> {title.hateCount}
                                                </span>
                                    }
                                    <h4>{title.context}</h4>
                                    <p><i class="icon fa-calendar"></i> 등록 날짜 : {title.writtenDate}</p>
                                </li>
                            )
                        })
                    }
                    {
                        titles.length === 0 ?
                            <li className="w3-bar">
                            <span className="image left w3-bar-item w3-circle" style={{
                                width : '150px'
                            }}>
                                <UserProfile loginId={''} />
                            </span>
                                <h4>제목을 올려주세요!!!</h4>
                            </li> : ''
                    }
                </ul>
            </div>
        )
    }
}
export default reduxForm({
    form : 'titleContext',
    enableReinitialize : true
})(MainTitleView);