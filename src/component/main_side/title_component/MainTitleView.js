import React, {Component} from 'react';
import {UserProfile, RequestProfile} from "../profile_image";
import {renderField} from "../../form";
import {reduxForm, Field, SubmissionError} from 'redux-form';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    appExecuteUserSaveTitle, appExecuteUserSaveTitleSuccess, appExecuteUserSaveTitleFailure, resetAppExecuteUserSaveTitle,
    appExecuteUserDeleteTitle, appExecuteUserDeleteTitleSuccess, appExecuteUserDeleteTitleFailure, resetAppExecuteUserDeleteTitle
} from "../../../action/action_title";

const IMAGE_URL = 'http://127.0.0.1:8082/ContextAPI/photo';

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
        saveStatus : state.title.saveStatus,
        deleteStatus : state.title.deleteStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        resetUserSaveTitle : () => dispatch(resetAppExecuteUserSaveTitle()),
        resetUserDeleteTitle : () => dispatch(resetAppExecuteUserDeleteTitle()),
        userDeleteTitle : (titleId) => dispatch(appExecuteUserDeleteTitle(titleId)).then((response) => {
            if(!response.error){
                dispatch(appExecuteUserDeleteTitleSuccess(response.payload));
            }else{
                dispatch(appExecuteUserDeleteTitleFailure(response.payload));
            }
        })
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

    handleClickMyPage(page){
        let div = document.getElementById("title_list");
        div.scrollIntoView();
        this.setState({
            currentPage : page
        })
    }

    handleClickDelete(titleId){
        let isDelete = window.confirm("님이 작성한 제목을 삭제합니다. 삭제 이후에는 복구가 불가능합니다. 계속 하시겠습니까?");
        if(isDelete){
            this.props.userDeleteTitle(titleId);
        }
    }

    componentWillUnmount(){
        this.props.resetUserSaveTitle();
        this.props.resetUserDeleteTitle();
    }

    render(){
        const {handleSubmit} = this.props;
        const {saveResult} = this.props.saveStatus;
        const {deleteResult} = this.props.deleteStatus;
        const {titles, hasTitle, loginId, requestId, pathname, search, currentPage} = this.state;
        const indexOfLastTitle = currentPage * 6;
        const indexOfFirstTitle = indexOfLastTitle - 6;
        const currentTitles = titles.slice(indexOfFirstTitle, indexOfLastTitle);
        let myPage = 1;
        if(titles.length > 0){
            if(hasTitle !== null){
                for(var k=0;k<titles.length;k++){
                    if(titles[k].id === hasTitle.id){
                        myPage = Math.floor(k / 6) + 1;
                        break;
                    }
                }
            }
        }

        if(saveResult === true){
            alert("입력하신 제목이 저장되었습니다.");
            this.props.history.push(`/view_request/${requestId}/_refresh${search}`);
        } else if(saveResult === false){
            alert("제목 저장 도중 예기치 않는 문제가 발생했습니다. 최대한 빨리 조치하겠습니다.");
            this.props.history.push(`/view_request/${requestId}/_refresh${search}`);
        }

        if(deleteResult === true){
            alert("입력하신 제목이 삭제되었습니다.");
            this.props.history.push(`/view_request/${requestId}/_refresh${search}`);
        } else if(saveResult === false){
            alert("제목 삭제 도중 예기치 않는 문제가 발생했습니다. 최대한 빨리 조치하겠습니다.");
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
                        <p><i className="icon fa-calendar"></i> {title.writtenDate}</p>
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
                                    <span className="w3-tag w3-round-large w3-red">
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
                    key={`number_${number}`}
                    id={number}
                    onClick={this.handleClick.bind(this)}
                >
                    {number}
                </button>
            );
        });

        const renderMyPage =
            <button
                className="w3-button w3-pale-blue"
                key={`myPage`}
                onClick={this.handleClickMyPage.bind(this, myPage)}
            >
                내 제목이 있는 페이지로 이동
            </button>

        return(
            <div id="title_list">
                <img
                    style={{
                        width : '100%',
                        height : 'auto'
                    }}
                    src={`${IMAGE_URL}/request_image/${requestId}`}
                    className="w3-image w3-round-large"
                />
                <br/><br/>
                <h3 className="w3-border-bottom w3-border-light-blue"><i className="fas fa-box-open"></i> 현재까지 올라온 제목 목록들</h3>
                <br/>
                {
                    loginId === 'ANONYMOUS_USER' ?
                        <div className="w3-panel w3-round-medium w3-pale-red">
                            <h3><i className="fas fa-exclamation-triangle"></i> 제목을 등록할 수 없습니다.</h3>
                            <p>제목을 등록하기 위해 로그인을 진행하시길 바랍니다.</p>
                        </div> :
                        hasTitle === null || hasTitle === '' ?
                            <form onSubmit={handleSubmit(validateAndSaveTitle)}>
                                <h4><i className="icon fa-pencil"></i> 제목을 등록합니다.</h4>
                                <Field type="text" placeholder="제목은 65자 이내로 입력하세요." name="context" component={renderField} />
                                <br/>
                                <button type="submit" className="button fit large">등록하기</button>
                            </form> :
                            <form onSubmit={handleSubmit(validateAndSaveTitle)}>
                                <h4><i className="icon fa-eraser"></i> 제목을 수정합니다.</h4>
                                <Field type="text" placeholder="제목은 65자 이내로 입력하세요." name="context" component={renderField} />
                                <br/>
                                <button type="submit" className="button fit large">수정하기</button>
                                <br/><br/>
                                <button type="button" className="button primary fit large" onClick={this.handleClickDelete.bind(this, hasTitle === null || hasTitle.id)}>
                                    <i className="icon fa-trash"></i> 제목 삭제하기
                                </button>
                            </form>
                }
                <br/>
                <div>
                    {renderTitles}
                </div>
                <br/>
                <div className="w3-center">
                    {renderPageNumbers}
                </div>
                <br/>
                <div className="w3-center">
                    { (hasTitle !== '' ) ? renderMyPage : ''}
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