import React, {Component} from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { withRouter } from 'react-router-dom';
import {BriefRequestView} from "../request_component";
import {renderField, renderSelect } from "../../form";
import queryString from 'query-string';
import { appFetchCategoryRequestBrief, appFetchCategoryRequestBriefSuccess, appFetchCategoryRequestBriefFailure } from "../../../action/action_request";
import { MainTitle, CategoryTitle } from "../../unit_component";
import {ListPagination} from "../../unit_component/request";
import {ModalScreen} from "../../unit_component/modal";

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
    handlePagination = (event) => {
        const { history, location } = this.props;
        const paginationModel = queryString.parse(location.search);
        let newPaginationModel = { ...paginationModel, pg : event.target.id };
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        history.push(`/category/_move?${queryString.stringify(newPaginationModel)}`);
    }

    componentWillMount(){
        this.props.fetchSearchOption();
        this.props.fetchOrderOption();
        this.props.fetchSizeOption();
    }

    componentDidMount(){
        const { categoryAction, requestAction } = this.props;
        let paginationModel = queryString.parse(this.props.location.search);
        this.handleInitialize(paginationModel);
        categoryAction.fetchCategoryElementAction(paginationModel.cid);
        requestAction.fetchBriefRequestsByQuery(paginationModel);
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
        const { category } = this.props;
        const { request, location } = this.props;
        const paginationModel = queryString.parse(location.search);
        const { list, loading, error, count } = request;
        const { searchBy } = this.props.searchOption;
        const { orderBy } = this.props.orderOption;
        const { sizeBy } = this.props.sizeOption;
        const { handleSubmit } = this.props;

        let requestRender = null;

        if(list){
            if(list.length > 0){
                requestRender =
                    <div className="posts">
                        {
                            list.map((request) => (
                                <BriefRequestView
                                    key={`request_${request.id}`}
                                    isHome={false}
                                    request={request}
                                    routeURI={`/view_request/${request.id}/view${location.search}`}
                                />
                            ))
                        }
                    </div>
            } else {
                requestRender = (
                    <div id="has_no_result" className="w3-panel w3-pale-red w3-round-large" style={{ padding : '20px 10px' }}>
                        <h2 className="w3-xlarge w3-center">
                        <span style={{ fontSize : '80px', lineHeight : '0.6em', opacity : '0.2', marginRight : '10px' }}>
                            <i className="fas fa-times-circle" />
                        </span>
                            <i>현재 분야에 해당되는 제목학원이 없습니다.</i>
                        </h2>
                        <h5 className="w3-center">매니저가 빠른 시간 내에 등록 해 올려 드리겠습니다. 나올 때까지 기다려주세요 :)</h5>
                    </div>
                )
            }
        } else if(error !== null){
            requestRender = (
                <div id="has_error_note" className="w3-panel w3-pale-red w3-round-large" style={{ padding : '20px 10px' }}>
                    <h2 className="w3-xlarge w3-center">
                        <span style={{ fontSize : '80px', lineHeight : '0.6em', opacity : '0.2', marginRight : '10px' }}>
                            <i className="fas fa-warning" />
                        </span>
                        <i>제목학원을 불러오는 도중 오류가 발생했습니다.</i>
                    </h2>
                    <h4 className="w3-center">오류 내용 : {error}</h4>
                    <h5 className="w3-center">계속해서 오류가 발생하면 개발자나 관리자에게 알려주세요 :)</h5>
                </div>
            );
        } else {
            requestRender = null;
        }

        return (
            <section>
                <MainTitle title="CATEGORY" />
                <CategoryTitle loading={category.loading} error={category.error} element={category.element} />
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

                { !loading ? requestRender : null }

                {
                    !loading ?
                        <div id="request_list_pagination" className="w3-bar w3-center">
                            <ListPagination
                                count={count}
                                page={paginationModel.pg}
                                size={paginationModel.sz ? paginationModel.sz : 6}
                                handle={this.handlePagination.bind(this)}
                            />
                        </div> : null
                }

                <ModalScreen title="Loading" opened={loading}>
                    <div className="w3-center">
                        <h1 className="fas fa-sync fa-spin" />
                        <h4>선택하신 분야에 해당 되는 제목학원을 불러오는 중입니다!</h4>
                    </div>
                </ModalScreen>
            </section>
        );
    }
}

export default reduxForm({
    form : 'searchToolbar'
})(withRouter(BriefRequestList));