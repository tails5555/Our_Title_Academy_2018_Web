import React, { Component, Fragment } from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { renderField, renderSelect } from "../../input_render";
import OptionLoadingView from "./OptionLoadingView";

const receivePagination = (values, dispatch) => {
    const paginationModel = {
        cid : (values.cid !== undefined) ? values.cid : 0,
        st : (values.st !== undefined) ? values.st : '',
        pg : 1,
        ob : (values.ob !== undefined) ? values.ob : 0,
        sb : (values.sb !== undefined) ? values.sb : 0,
        sz : (values.sz !== undefined) ?
                (values.sz !== 0) ?
                    values.sz : 6
                : 6
    };

    window.location.href = `/category/_move?${queryString.stringify(paginationModel)}`;
}

class RequestSearchForm extends Component {
    constructor(props){
        super(props);
        this.state = { data : null, loading : false, error : null };
    }

    componentDidMount(){
        const { location } = this.props;
        const paginationModel = queryString.parse(location.search);
        this.handleInitialize(paginationModel)
    }

    handleInitialize = (paginationModel) => {
        const initData = {
            cid : (paginationModel.cid === undefined) ? 0 : paginationModel.cid,
            sb : (paginationModel.sb === undefined) ? 0 : paginationModel.sb,
            ob : (paginationModel.ob === undefined) ? 0 : paginationModel.ob,
            sz : (paginationModel.sz === undefined) ? 6 : paginationModel.sz,
            st : (paginationModel.st === undefined) ? '' : paginationModel.st
        };
        this.props.initialize(initData);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { data, loading, error } = nextProps;
        if(
            data !== prevState.data ||
            loading !== prevState.loading ||
            error !== prevState.error
        ) {
            return {
                data, loading, error
            };
        }

        return null;
    }

    render(){
        const { handleSubmit } = this.props;
        const { data, loading, error } = this.state;

        const searchBy = data && (data['search'] || []);
        const orderBy = data && (data['order'] || []);
        const sizeBy = data && (data['size'] || []);

        const searchError = error && (error['search'] || null);
        const orderError = error && (error['order'] || null);
        const sizeError = error && (error['size'] || null);

        return (
            <Fragment>
                <form id="category_requests_search_form" onSubmit={handleSubmit(receivePagination)}>
                    {
                        loading ?
                            <OptionLoadingView id={"search_options_loading_view"} title={"검색 조건을 서버에서 불러오는 중입니다..."} style={{ marginBottom : '20px' }} /> : null
                    }
                    <div id="search_by_form_group" style={{ marginBottom : '20px' }}>
                        <label htmlFor="sb">검색 조건</label>
                        <Field name="sb" component={renderSelect} children={ searchBy.map((search) => <option key={`search_${search.value}`} value={search.value}>{search.label}</option> )} />
                    </div>
                    <div id="order_by_form_group" style={{ marginBottom : '20px' }}>
                        <label htmlFor="ob">정렬 조건</label>
                        <Field name="ob" component={renderSelect} children={ orderBy.map((order) => <option key={`order_${order.value}`} value={order.value}>{order.label}</option> )} />
                    </div>
                    <div id="size_by_form_group" style={{ marginBottom : '20px' }}>
                        <label htmlFor="sz">크기</label>
                        <Field name="sz" component={renderSelect} children={ sizeBy.map((size, idx) => <option key={`size_${idx}`} value={size}>{`${size}개씩 보기`}</option> )} />
                    </div>
                    <div id="search_text_form_group" style={{ marginBottom : '20px' }}>
                        <Field type="text" name="st" component={renderField} label="검색어" placeholder="검색어를 입력하세요." />
                    </div>
                    <button type="submit" className="button primary fit large"><i className="fas fa-search" /> 검색하기</button>
                </form>
            </Fragment>
        )
    }
}

export default reduxForm({
    form : 'requestSearchForm',
    enableReinitialize : true,
    keepDirtyOnReinitialize : true,
})(withRouter(RequestSearchForm));
