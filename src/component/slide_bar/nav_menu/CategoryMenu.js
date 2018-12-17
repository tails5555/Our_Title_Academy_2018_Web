import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class CategoryMenu extends Component{
    handleClickTop(){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    componentDidMount(){
        const { categoryAction } = this.props;
        categoryAction.fetchCategoryListAction();
    }

    render(){
        const { category } = this.props;
        const { list, loading, error } = category;
        let menuView;
        if(list.length > 0){
            menuView = list.map((category, idx) => (
                <li key={`category_${idx}`} onClick={() => this.handleClickTop()}>
                    <Link to={`/category/_move?cid=${category.id}&pg=1`}>
                        <i className="fas fa-book" /> {category.name}
                    </Link>
                </li>
            ));
        } else if(error !== null){
            menuView = (
                <li id="category_menu_error">
                    <div className="w3-panel w3-red w3-round-large w3-center">
                        <h6 className="w3-text-white"><i className="fas fa-warning" /> {error}</h6>
                    </div>
                </li>
            );
        } else if(loading){
            menuView = (
                <li id="category_menu_loading">
                    <div className="w3-panel w3-yellow w3-round-large w3-center">
                        <h6 className="w3-text-black"><i className="fas fa-spinner fa-spin" /> Loading</h6>
                    </div>
                </li>
            );
        }
        return(
            <nav id="category_menu" className="my_menu">
                <ul>
                    <li id="category_menu_title">
                        <div className="w3-panel w3-orange w3-round-large w3-center">
                            <h6 className="w3-text-white">Categories</h6>
                        </div>
                    </li>
                    {menuView}
                </ul>
            </nav>
        )
    }
}
export default CategoryMenu;