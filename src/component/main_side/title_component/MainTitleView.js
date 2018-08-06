import React, {Component} from 'react';
import {UserProfile, RequestProfile} from "../profile_image";
import {renderField} from "../../form";
import {reduxForm, Field, SubmissionError} from 'redux-form';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {appExecuteUserSaveTitle, appExecuteUserSaveTitleSuccess, appExecuteUserSaveTitleFailure, resetAppExecuteUserSaveTitle} from "../../../action/action_title";

function validate(values){
    var errors = {};
    var hasErrors = false;

    if(!values.context || values.context.trim() === ''){
        errors.context = '제목 내용을 입력하세요.';
        hasErrors = true;
    } else if(values.context.length > 65){
        errors.context = '제목은 65자 이하로 입력하세요.';
        hasErrors = true;
    }

    return hasErrors && errors;
}

function mapStateToProps(state){
    const {result} = state.title.hasTitle;
    let contextValue = (result !== null) ? result.context : '';
    return {
        initialValues : {
            context : contextValue
        },
        saveStatus : state.title.saveStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        resetUserSaveTitle : () => dispatch(resetAppExecuteUserSaveTitle())
    }
}

const validateAndSaveTitle = (values, dispatch, props) => {
    return dispatch(appExecuteUserSaveTitle(props.loginId, props.requestId, values.context)).then(
        (response) => {
            if(response.payload && response.payload.status !== 200){
                dispatch(appExecuteUserSaveTitleFailure(response.payload));
                throw new SubmissionError(response.payload.data);
            }
            dispatch(appExecuteUserSaveTitleSuccess(response.payload));
        }
    )
}

class MainTitleView extends Component{
    constructor(props){
        super(props);
        this.state = { titles : [], hasTitle : this.props.hasTitle, loginId : this.props.loginId, requestId : this.props.requestId, pathname : this.props.pathname, search : this.props.search, currentPage : 1 };
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
        if (this.props.requestId !== nextProps.requestId){
            this.propsUpdating('requestId', nextProps.requestId);
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

    handleClick(event) {
        let div = document.getElementById("title_list");
        div.scrollIntoView();
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    componentWillUnmount(){
        this.props.resetUserSaveTitle();
    }

    render(){
        const {handleSubmit} = this.props;
        const {result} = this.props.saveStatus;
        const {titles, hasTitle, loginId, requestId, pathname, search, currentPage} = this.state;
        const indexOfLastTitle = currentPage * 6;
        const indexOfFirstTitle = indexOfLastTitle - 6;
        const currentTitles = titles.slice(indexOfFirstTitle, indexOfLastTitle);

        if(result === true){
            alert("입력하신 제목이 저장되었습니다.");
            this.props.history.push(`/view_request/${requestId}/_refresh${search}`);
        } else if(result === false){
            alert("제목 저장 도중 예기치 않는 문제가 발생했습니다. 최대한 빨리 조치하겠습니다.");
            this.props.history.push(`/view_request/${requestId}/_refresh${search}`);
        }

        let renderTitles = currentTitles.map((title, idx) => {
            let divClass;
            if(loginId === title.userId){
                divClass = "box w3-pale-blue";
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
                        <p><i class="icon fa-calendar"></i> {title.writtenDate}</p>
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
                                        <i className="icon fa-thumbs-down"></i> {title.hateCount} <i className="icon fa-check-circle"></i>
                                    </span>
                                </Link> :
                                title.hateChecked !== null ?
                                    <Link to={`${pathname}/title_empathy/${title.id}/${loginId}/hate${search}`}>
                                        <span className="w3-tag w3-round-large w3-red">
                                            <i className="icon fa-thumbs-down"></i> {title.hateCount}
                                        </span>
                                    </Link> :
                                    <span class="w3-tag w3-round-large w3-red">
                                        <i className="icon fa-thumbs-down"></i> {title.hateCount}
                                    </span>
                        }
                    </div>
                </div>
            )
        });

        if(titles.length <= 0){
            renderTitles =
                <div className="box">
                    <div className="w3-panel w3-topbar w3-bottombar w3-border-red w3-pale-red w3-center">
                        <h4 style={{fontFamily : '궁서체'}}>제목이 아무 것도 없습니다...</h4>
                    </div>
                    <br/>
                    <div className="w3-container">
                        <span className="image left" style={{
                            width : '200px'
                        }}>
                            <UserProfile loginId='ANONYMOUS_USER' />
                        </span>
                        <h5>이 사진에 어울리는 제목에 도전하세요!!!</h5>
                    </div>
                </div>
        }

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(titles.length / 6); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <button
                    className="w3-button w3-pale-red"
                    key={number}
                    id={number}
                    onClick={this.handleClick.bind(this)}
                >
                    {number}
                </button>
            );
        });

        return(
            <div id="title_list">
                <h3 className="w3-border-bottom w3-border-light-blue"><i class="fas fa-box-open"></i> 현재까지 올라온 제목 목록들</h3>
                <br/>
                {
                    loginId === 'ANONYMOUS_USER' ?
                        <div className="w3-panel w3-round-medium w3-pale-red">
                            <h3><i class="fas fa-exclamation-triangle"></i> 제목을 등록할 수 없습니다.</h3>
                            <p>제목을 등록하기 위해 로그인을 진행하시길 바랍니다.</p>
                        </div> :
                        hasTitle === '' ?
                            <form onSubmit={handleSubmit(validateAndSaveTitle)}>
                                <h4><i class="icon fa-pencil"></i> 제목을 등록합니다.</h4>
                                <Field type="text" placeholder="제목은 65자 이내로 입력하세요." name="context" component={renderField} />
                                <br/>
                                <button type="submit" className="button primary fit large">등록하기</button>
                            </form> :
                            <form onSubmit={handleSubmit(validateAndSaveTitle)}>
                                <h4><i class="icon fa-eraser"></i> 제목을 수정합니다.</h4>
                                <Field type="text" placeholder="제목은 65자 이내로 입력하세요." name="context" component={renderField} />
                                <br/>
                                <button type="submit" className="button primary fit large">수정하기</button>
                            </form>
                }
                <div>
                    {renderTitles}
                </div>
                <br/>
                <div className="w3-center">
                    {renderPageNumbers}
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form : 'titleForm',
    enableReinitialize : true,
    validate
})(withRouter(MainTitleView)));