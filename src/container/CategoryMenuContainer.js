import {CategoryMenu} from "../component/slide_bar/nav_menu";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CategoryAction from "../action/action_category";

function mapStateToProps(state){
    return {
        category : state.category
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        categoryAction : bindActionCreators(CategoryAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu);
