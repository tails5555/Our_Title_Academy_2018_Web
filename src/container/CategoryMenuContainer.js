import {CategoryMenu} from "../component/slide_bar/nav_menu";
import {connect} from 'react-redux';
import {appLoadCategories, appLoadCategoriesSuccess, appLoadCategoriesFailure, resetAppLoadCategories} from "../action/action_category";

function mapStateToProps(state){
    return {
        menuCategories : state.category.menuCategories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadCategories : () => {
            dispatch(appLoadCategories()).then((response) => {
                if(!response.error){
                    dispatch(appLoadCategoriesSuccess(response.payload));
                }else{
                    dispatch(appLoadCategoriesFailure(response.payload));
                }
            })
        },
        resetLoadCategories : () => {
            dispatch(resetAppLoadCategories());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu);
