import {BriefRequestList} from "../component/main_side/category_page";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    appFetchCategoryRequestBrief, appFetchCategoryRequestBriefSuccess, appFetchCategoryRequestBriefFailure, resetAppFetchCategoryRequestBrief,
    appFetchSearchByOption, appFetchSearchByOptionSuccess, appFetchSearchByOptionFailure, resetAppFetchSearchByOption,
    appFetchOrderByOption, appFetchOrderByOptionSuccess, appFetchOrderByOptionFailure, resetAppFetchOrderByOption,
    appFetchSizeByOption, appFetchSizeByOptionSuccess, appFetchSizeByOptionFailure, resetAppFetchSizeByOption
} from "../action/action_request";
import * as CategoryAction from '../action/action_category';
import * as RequestAction from '../action/action_request';

function mapStateToProps(state){
    return {
        searchToolbar : state.form.searchToolbar,
        category : state.category,
        request : state.request.main,
        requestList : state.request.requestList,
        paginate : state.request.paginate,
        searchOption : state.request.searchOption,
        orderOption : state.request.orderOption,
        sizeOption : state.request.sizeOption
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategoryRequestBrief : (categoryId, pagination) => {
            dispatch(appFetchCategoryRequestBrief(categoryId, pagination)).then((response) => {
                if(!response.error){
                    dispatch(appFetchCategoryRequestBriefSuccess(response.payload));
                }else{
                    dispatch(appFetchCategoryRequestBriefFailure(response.payload));
                }
            })
        },
        resetFetchCategoryRequestBrief : () => dispatch(resetAppFetchCategoryRequestBrief()),
        fetchSearchOption : () => {
            dispatch(appFetchSearchByOption()).then((response) => {
                if(!response.error){
                    dispatch(appFetchSearchByOptionSuccess(response.payload));
                }else{
                    dispatch(appFetchSearchByOptionFailure(response.payload));
                }
            });
        },
        resetFetchSearchOption : () => dispatch(resetAppFetchSearchByOption()),
        fetchOrderOption : () => {
            dispatch(appFetchOrderByOption()).then((response) => {
                if(!response.error){
                    dispatch(appFetchOrderByOptionSuccess(response.payload));
                }else{
                    dispatch(appFetchOrderByOptionFailure(response.payload));
                }
            })
        },
        resetFetchOrderOption : () => dispatch(resetAppFetchOrderByOption()),
        fetchSizeOption : () => {
            dispatch(appFetchSizeByOption()).then((response) => {
                if(!response.error){
                    dispatch(appFetchSizeByOptionSuccess(response.payload));
                }else{
                    dispatch(appFetchSizeByOptionFailure(response.payload));
                }
            })
        },
        resetFetchSizeOption : () => dispatch(resetAppFetchSizeByOption()),
        categoryAction : bindActionCreators(CategoryAction, dispatch),
        requestAction : bindActionCreators(RequestAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BriefRequestList);