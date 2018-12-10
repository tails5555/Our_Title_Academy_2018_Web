import React, {Component} from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { withRouter } from 'react-router-dom';
import {BriefRequestView} from "../request_component";
import {renderField, renderSelect } from "../../form";
import queryString from 'query-string';
import { appFetchCategoryRequestBrief, appFetchCategoryRequestBriefSuccess, appFetchCategoryRequestBriefFailure } from "../../../action/action_request";

const receivePagination = (values, dispatch, props) => {
    const { paginationModel } = props.paginate;
    let newPaginationModel = {
        id : paginationModel.id,
        st : (values.st !== undefined) ? values.st : '',
        pg : 1,
        ob : (values.ob !== undefined) ? values.ob : 0,
        sb : (values.sb !== undefined) ? values.sb : 0,
        sz : (values.sz !== undefined) ? (values.sz !== 0) ? values.sz : 6 : 6
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
        const { categoryAction } = this.props;
        let paginationModel = queryString.parse(this.props.location.search);
        this.handleInitialize(paginationModel);
        categoryAction.fetchCategoryElementAction(this.props.match.params.id);
        // paginationModel 이 {} 모양이어도, 모든 목록이 나오기 때문에 정상적으로 돌아가는 것을 확인했습니다!
        this.props.fetchCategoryRequestBrief(this.props.match.params.id, paginationModel);
    }

    handleInitialize(paginationModel) {
        const initData = {
            sb : (paginationModel.sb === undefined) ? 0 : paginationModel.sb,
            ob : (paginationModel.ob === undefined) ? 0 : paginationModel.ob,
            sz : (paginationModel.sz === undefined) ? 6 : paginationModel.sz,
            st : (paginationModel.st === undefined) ? '' : paginationModel.st
        };
        this.props.initialize(initData);
    }

    componentWillUnmount(){
        const { categoryAction } = this.props;
        this.props.resetFetchCategoryRequestBrief();
        categoryAction.resetFetchCategoryElementAction();
        this.props.resetFetchSearchOption();
        this.props.resetFetchOrderOption();
        this.props.resetFetchSizeOption();
    }

    render() {
        const { element } = this.props.category;
        const { requests } = this.props.requestList;
        const { searchBy } = this.props.searchOption;
        const { orderBy } = this.props.orderOption;
        const { sizeBy } = this.props.sizeOption;
        const { handleSubmit } = this.props;
        const { paginationModel } = this.props.paginate;

        const requestClass = (requests.length > 0) ? "posts" : '';
        const requestRender = (requests.length > 0) ? requests.map((request) => {
                return(
                    <BriefRequestView key={`request_${request.id}`} isHome={false} request={request} routeURI={`/view_request/${request.id}/view?${paginationModel.queryString}`} />
                )
            }) :
            <div className="w3-panel w3-pale-red w3-round-large">
                <br/>
                <span style={{fontSize:'80px', lineHeight:'0.6em', opacity:'0.2'}}><i className="fas fa-times-circle"></i></span>
                <br/>
                <h2 className="w3-xlarge"><i>현재 카테고리에 해당되는 요청이 없습니다.</i></h2>
                <p>매니저가 빠른 시간 내에 등록 해 드립니다. 나올 때까지 기다려주세요 :)</p>
            </div>
        ;
        const pageNumbers = [];
        const barCount = 10;
        const pageCount = (paginationModel !== null) ? Math.ceil(paginationModel.requestCount / paginationModel.sz) : 1;
        let base = (paginationModel !== null) ? Math.floor((paginationModel.pg - 1) / 10) * 10 : 0;

        if(base > 0)
            pageNumbers.push(base);

        for (let i = 1; i <= barCount; i++) {
            let n = base + i;
            if(n > pageCount) break;
            pageNumbers.push(n);
        }

        let n = base + 11;
        if(n <= pageCount)
            pageNumbers.push(n);

        const renderPageNumbers = pageNumbers.map((number, idx) => {
            return (
                (number > base && number < base + 11) ?
                    <button className={((paginationModel === null) || paginationModel.pg === number) ? "w3-button w3-pink" : "w3-button w3-hover-pink"}
                            key={number}
                            id={number}
                            onClick={this.handlePagination.bind(this)}
                    >
                        &nbsp;{number}&nbsp;
                    </button> :
                    (idx === 0) ?
                        <button className="w3-button w3-hover-pink"
                                key={number}
                                id={number}
                                onClick={this.handlePagination.bind(this)}
                        >
                            &nbsp;이전&nbsp;
                        </button> :
                        <button className="w3-button w3-hover-pink"
                                key={number}
                                id={number}
                                onClick={this.handlePagination.bind(this)}
                        >
                            &nbsp;다음&nbsp;
                        </button>
            );
        });

        return (
            <section>
                <header id="header">
                    <span className="logo"><strong>Our Title Academy 2018</strong> - CATEGORY</span>
                </header>
                <br/><br/>
                <header className="major">
                    <h2>분류 별 제목 학원 - { element === null || element.name }</h2>
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
                <div className={requestClass}>
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