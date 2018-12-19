import React, {Component} from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

import { BriefRequestCard } from "./../unit_component/request";
import { MainTitleHeader, CategoryTitleHeader } from "../unit_component/header";
import { ListPagination } from "../unit_component/request";
import { ModalScreen } from "../unit_component/modal";
import { AlertBoxNote } from "../unit_component/alert_box";
import { RequestSearchForm } from "../unit_component/form_model";

class BriefRequestListView extends Component {
    constructor(props){
        super(props);
        this.state = { showModal : false };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { request } = nextProps;
        if(
            prevState.showModal !== request.loading
        ) {
            return {
                showModal : request.loading
            };
        }
        return null;
    }

    componentDidMount(){
        const { categoryAction, requestAction, location } = this.props;

        const { fetchCategoryElementAction } = categoryAction;
        const { fetchBriefRequestsByQuery, fetchSearchAllOptions } = requestAction;

        let paginationModel = queryString.parse(location.search);
        fetchCategoryElementAction(paginationModel && paginationModel.cid);

        fetchBriefRequestsByQuery(paginationModel);
        fetchSearchAllOptions();
    }

    componentWillUnmount(){
        const { categoryAction } = this.props;

        const { resetFetchCategoryElementAction } = categoryAction;
        resetFetchCategoryElementAction();
    }

    handleClickPage = (event) => {
        const { history, location } = this.props;
        const paginationModel = queryString.parse(location.search);
        history.push(`/category/_move?${queryString.stringify({ ...paginationModel, pg: event.target.id })}`);
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    render() {
        const { showModal } = this.state;
        const { category, request, options, location } = this.props;
        const { list, loading, error, count } = request;
        const paginationModel = queryString.parse(location.search);

        let requestRender = null;

        if(list){
            if(list.length > 0){
                requestRender =
                    <div className="posts">
                        {
                            list.map((request) => (
                                <BriefRequestCard
                                    key={`request_${request.id}`}
                                    isHome={false}
                                    element={request}
                                />
                            ))
                        }
                    </div>
            } else {
                requestRender = (
                    <AlertBoxNote
                        id={"has_no_result"}
                        icon={"fas fa-times-circle"}
                        title={"현재 분야에 해당되는 제목학원이 없습니다."}
                        context={"매니저가 빠른 시간 내에 등록 해 올려 드리겠습니다. 나올 때까지 기다려주세요 :)"}
                    />
                );
            }
        } else if(error !== null){
            requestRender = (
                <AlertBoxNote
                    id={"has_error_note"}
                    icon={"fas fa-warning"}
                    title={"해당 분야의 제목학원을 불러오는 도중 오류가 발생했습니다."}
                    context={`오류 내용 : ${error}\n 계속해서 오류가 발생하면 개발자나 관리자에게 알려주세요 :)`}
                />
            );
        } else {
            requestRender = null;
        }

        return (
            <section id="category_brief_requests">
                <MainTitleHeader title="CATEGORY" />
                <CategoryTitleHeader loading={category.loading} error={category.error} element={category.element} />
                <RequestSearchForm loading={options.loading} error={options.error} data={options.data} />
                { !loading ? requestRender : null }
                {
                    !loading ?
                        <div id="request_list_pagination" className="w3-bar w3-center">
                            <ListPagination
                                count={count}
                                page={paginationModel.pg}
                                size={paginationModel.sz ? paginationModel.sz : 6}
                                handle={this.handleClickPage.bind(this)}
                            />
                        </div> : null
                }
                <ModalScreen title="Loading" opened={showModal}>
                    <div className="w3-center w3-padding">
                        <i className="fas fa-sync fa-spin"  style={{ fontSize : '80px', margin : '10px' }} />
                        <h4>선택하신 분야에 해당 되는 제목학원을 불러오는 중입니다!</h4>
                    </div>
                </ModalScreen>
            </section>
        );
    }
}

export default withRouter(BriefRequestListView);