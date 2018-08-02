import {BriefRequestList} from "../component/main_side/category_page";
import {connect} from 'react-redux';
import {
    appFetchCategoryRequestBrief, appFetchCategoryRequestBriefSuccess, appFetchCategoryRequestBriefFailure, resetAppFetchCategoryRequestBrief,
    appFetchSearchByOption, appFetchSearchByOptionSuccess, appFetchSearchByOptionFailure, resetAppFetchSearchByOption,
    appFetchOrderByOption, appFetchOrderByOptionSuccess, appFetchOrderByOptionFailure, resetAppFetchOrderByOption,
    appFetchSizeByOption, appFetchSizeByOptionSuccess, appFetchSizeByOptionFailure, resetAppFetchSizeByOption
} from "../action/action_request";
import {
    appSelectCategory, appSelectCategorySuccess, appSelectCategoryFailure, resetAppSelectCategory
} from "../action/action_category";

function mapStateToProps(state){
    return {
        selectCategory : state.category.selectCategory,
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
        fetchSelectCategory : (id) => dispatch(appSelectCategory(id)).then((response) => {
            if(!response.error){
                dispatch(appSelectCategorySuccess(response.payload));
            }else{
                dispatch(appSelectCategoryFailure(response.payload));
            }
        }),
        resetFetchSelectCategory : () => dispatch(resetAppSelectCategory())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BriefRequestList);