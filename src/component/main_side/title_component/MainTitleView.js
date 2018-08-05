import React, {Component} from 'react';
import {UserProfile, RequestProfile} from "../profile_image";
import {renderField} from "../../form";
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
class MainTitleView extends Component{
    constructor(props){
        super(props);
        this.state = { titles : [], hasTitle : this.props.hasTitle, loginId : this.props.loginId, pathname : this.props.pathname, search : this.props.search, currentPage : 1 };
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

    handleClick(event) {
        let div = document.getElementById("title_list");
        div.scrollIntoView();
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render(){
        const {titles, hasTitle, loginId, pathname, search, currentPage} = this.state;
        const indexOfLastTitle = currentPage * 6;
        const indexOfFirstTitle = indexOfLastTitle - 6;
        const currentTitles = titles.slice(indexOfFirstTitle, indexOfLastTitle);

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

        if(loginId !== 'ANONYMOUS_USER'){
            if(hasTitle !== null){
                const initData = {
                    context : hasTitle.context
                };
                this.props.initialize(initData);
            }
        }

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
                            <form>
                                <h4><i class="icon fa-pencil"></i> 제목을 등록합니다.</h4>
                                <Field type="text" placeholder="제목은 65자 이내로 입력하세요." name="context" component={renderField} />
                            </form> :
                            <form>
                                <h4><i class="icon fa-eraser"></i> 제목을 수정합니다.</h4>
                                <Field type="text" placeholder="제목은 65자 이내로 입력하세요." name="context" component={renderField} />
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
export default reduxForm({
    form : 'titleContext',
    enableReinitialize : true
})(MainTitleView);