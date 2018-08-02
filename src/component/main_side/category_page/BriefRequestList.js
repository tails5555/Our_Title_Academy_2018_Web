import React, {Component} from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import {RequestProfile} from "../profile_image";
import {renderField, renderSelect } from "../../form";
import { appFetchCategoryRequestBrief, appFetchCategoryRequestBriefSuccess, appFetchCategoryRequestBriefFailure, resetAppFetchCategoryRequestBrief } from "../../../action/action_request";

const IMAGE_URL = 'http://127.0.0.1:8082/ContextAPI/photo';

const receivePagination = (values, dispatch, props) => {
    const { paginationModel } = props.paginate;
    let newPaginationModel = {
        id : paginationModel.id,
        st : (values.st !== undefined) ? values.st : '',
        pg : 1,
        ob : (values.ob !== undefined) ? values.ob : 0,
        sb : (values.sb !== undefined) ? values.sb : 0,
        sz : (values.sz !== undefined) ? (values.sz != 0) ? values.sz : 6 : 6
    };
    return dispatch(appFetchCategoryRequestBrief(newPaginationModel.id, newPaginationModel)).then(
        (response) => {
            if(response.payload && response.payload.status !== 200){
                dispatch(appFetchCategoryRequestBriefFailure(response.payload));
                throw new SubmissionError(response.payload.data);
            }
            dispatch(appFetchCategoryRequestBriefSuccess(response.payload));
        }
    )
}

class BriefRequestList extends Component{
    handleClick(event){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    handlePagination(event){
        const { paginationModel } = this.props.paginate;
        let newPaginationModel = { ...paginationModel, pg : event.target.id };
        this.props.fetchCategoryRequestBrief(this.props.match.params.id, newPaginationModel);
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    componentWillMount(){
        this.props.fetchSearchOption();
        this.props.fetchOrderOption();
        this.props.fetchSizeOption();
    }

    componentDidMount(){
        this.props.fetchSelectCategory(this.props.match.params.id);
        this.props.fetchCategoryRequestBrief(this.props.match.params.id, {});
    }

    componentWillUnmount(){
        this.props.resetFetchCategoryRequestBrief();
        this.props.resetFetchSearchOption();
        this.props.resetFetchOrderOption();
        this.props.resetFetchSizeOption();
    }

    render() {
        const { category } = this.props.selectCategory;
        const { requests } = this.props.requestList;
        const { searchBy } = this.props.searchOption;
        const { orderBy } = this.props.orderOption;
        const { sizeBy } = this.props.sizeOption;
        const { handleSubmit } = this.props;
        const { paginationModel } = this.props.paginate;

        const requestRender = requests.map((request) => {
            return(
                <article>
                    <Link className="image" to={`/view_request/${request.id}/view?${paginationModel.queryString}`}>
                        <img src={`${IMAGE_URL}/request_image/${request.id}`}  onClick={this.handleClick.bind(this)} />
                    </Link>
                    <div className="w3-panel w3-topbar w3-bottombar w3-border-yellow w3-pale-yellow w3-center">
                        <h3 style={{fontFamily : '궁서체'}}>{request.bestTitle}</h3>
                    </div>
                    <p className="w3-right-align">
                        <i className="icon fa-calendar"></i> {request.writtenDate}<br/>
                        <i className="icon fa-star"></i> {request.likeCount}<br/>
                        <i className="icon fa-comments"></i> {request.commentCount}<br/>
                    </p>
                    <span className="image left"><RequestProfile loginId={request.userId}/></span>
                    <h3>{request.intro}</h3>
                    <p>{request.context}</p>
                    <ul className="actions">
                        <li onClick={this.handleClick.bind(this)}><Link className="button" to={`/view_request/${request.id}`}>제목 짓기</Link></li>
                    </ul>
                </article>
            )
        });

        const pageNumbers = [];
        const barCount = 10;
        const pageCount = (paginationModel !== null) ? Math.ceil(paginationModel.requestCount / paginationModel.sz) : 1;
        let base = (paginationModel !== null) ? Math.floor((paginationModel.pg - 1) / 10) * 10 : 0;

        if(base > 0)
            pageNumbers.push(base);

        for (let i = 1; i <= barCount; i++) {
            let n = base + i;
            if(n > pageCount) break;
            pageNumbers.push(i);
        }

        let n = base + 11;
        if(n <= pageCount)
            pageNumbers.push(n);

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <button className="w3-button"
                    key={number}
                    id={number}
                    onClick={this.handlePagination.bind(this)}
                >
                    &nbsp;{number}&nbsp;
                </button>
            );
        });

        return (
            <section>
                <header id="header">
                    <span class="logo"><strong>Our Title Academy 2018</strong> - CATEGORY</span>
                </header>
                <br/><br/>
                <header class="major">
                    <h2>분류 별 제목 학원 - { category === null || category.name }</h2>
                </header>
                <form onSubmit={handleSubmit(receivePagination, this.props.match.params.id)}>
                    <label>검색 조건</label>
                    <Field name="sb" component={renderSelect} children={ searchBy.map((search) => <option key={`search_${search.value}`} value={search.value}>{search.label}</option> )} />
                    <br/>
                    <label>정렬 조건</label>
                    <Field name="ob" component={renderSelect} children={ orderBy.map((order) => <option key={`order_${order.value}`} value={order.value}>{order.label}</option> )} />
                    <br/>
                    <label>크기</label>
                    <Field name="sz" component={renderSelect} children={ sizeBy.map((size, idx) => <option key={`size_${idx}`} value={size}>{`${size}개씩 보기`}</option> )} />
                    <br/>
                    <Field type="text" name="st" component={renderField} label="검색어" placeholder="검색어를 입력하세요." />
                    <br/><br/>
                    <button type="submit" className="button primary fit large">검색하기</button>
                </form>
                <div class="posts">
                    {requestRender}
                </div>
                <div className="w3-bar w3-center">
                    {renderPageNumbers}
                </div>
            </section>
        );
    }
}

export default reduxForm({
    form : 'searchToolbar'
})(withRouter(BriefRequestList));