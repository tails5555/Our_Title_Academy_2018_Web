import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import * as RequestAction from '../../../action/action_request';
import { renderSelect } from "../../input_render";
import { ModalScreen } from "../modal";

const mapStateToProps = ({ category, request }) => ({
    request : request.form,
    category
});

const mapDispatchToProps = (dispatch) => ({
    requestAction : bindActionCreators(RequestAction, dispatch)
});

function validate(values){
    var errors = {};
    var hasErrors = false;

    if(!values.categoryId || values.categoryId === 0){
        errors.categoryId = '카테고리를 선택하세요.';
        hasErrors = true;
    }

    return hasErrors && errors;
}

const validateAndSubmitAgreeModel = (values, dispatch) => {
    let agreeModel = {
        requestId : values && values.requestId,
        categoryId : values && values.categoryId,
        available : values && (values.available) ? true : false
    }

    if(agreeModel.available) {
        dispatch(RequestAction.agreeMainRequest(agreeModel));
    } else {
        alert('동의 버튼을 클릭해야 사연을 등록할 수 있습니다.');
    }
}

class AgreeModelForm extends Component {
    constructor(props){
        super(props);
        this.state = { categories : [], complete : null, loading : false, error : null, type : null, element : null };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { request, category } = nextProps;
        const { categories, complete, loading, error, type, element } = prevState;
        if(
            categories !== category.list || complete !== request.complete || loading !== request.loading || error !== request.error || type !== request.type || element !== nextProps.element
        ) {
            return {
                categories : category.list, complete : request.complete, loading : request.loading, error : request.error, type : request.type, element : nextProps.element
            };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState){
        const { history, change } = this.props;
        const { complete, type, element, error } = this.state;
        if(complete === true){
            if(type === 'AGREE'){
                alert('선택 하신 사연이 활성화 되었습니다. 사연은 언제든지 차단 가능합니다.');
                history.push('./photo_agree/_refresh');
            }
        } else if(complete === false){
            alert('사연을 활성화 하는 도중 데이터베이스 내부에 오류가 발생 했습니다.\n 이 문제가 계속 발생하면 개발자에게 조치를 취하시길 바랍니다.');
            history.push('./photo_agree/_refresh');
        }

        if(error){
            alert(`사연을 활성화 하는 도중 네트워크 오류가 발생 했습니다.\n오류 내용 : ${error}`);
            history.push('./photo_agree/_refresh');
        }

        if(element !== null)  {
            change('requestId', element && element.id);
            if(element && element.categoryId > 0){
                change('categoryId', element && element.categoryId);
            }
        } else {
            change('requestId', null);
            change('categoryId', 0);
        }
    }

    componentWillUnmount(){
        const { requestAction } = this.props;
        const { resetSavingMainRequestByModel } = requestAction;
        resetSavingMainRequestByModel();
    }

    render(){
        const { handleSubmit } = this.props;
        const { categories, loading } = this.state;
        return (
            <Fragment>
                <form onSubmit={handleSubmit(validateAndSubmitAgreeModel)}>
                    <h2 className="w3-center">배정을 원하는 분야를 선택하세요.</h2>
                    <div id="category_form_group" style={{ margin : '10px' }}>
                        <label htmlFor="categoryId">배정 카테고리 선택</label>
                        <Field name="categoryId" component={renderSelect} children={ categories.map((category) => <option key={`category_${category.id}`} value={category.id}>{category.name}</option> )} />
                    </div>
                    <div id="available_form_group" style={{ margin : '10px' }}>
                        <Field
                            id="available"
                            name="available"
                            component="input"
                            type="checkbox"
                        />
                        <label htmlFor="available">이를 체크하면 사연 목록에 올라갑니다. 부적절한 사진인 경우에 한 번 더 확인 바랍니다.</label>
                    </div>
                    <button type="submit" className="button primary fit large">
                        <i className="fas fa-check" /> 선택 완료
                    </button>
                </form>
                <ModalScreen title="Loading" opened={loading}>
                    <div className="w3-center w3-padding">
                        <i className="fas fa-sync fa-spin" style={{fontSize: '80px', margin: '10px'}}/>
                        <h4>선택하신 사연을 활성화 하는 중입니다!</h4>
                    </div>
                </ModalScreen>
            </Fragment>
        );
    }
}

AgreeModelForm = reduxForm({
    form : 'requestAgreeForm',
    validate,
    keepDirtyOnReinitialize : true,
    enableReinitialize : true
})(AgreeModelForm);

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AgreeModelForm)
);