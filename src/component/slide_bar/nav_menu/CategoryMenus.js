import React, { Component } from 'react';
import NavMenuTitle from "./NavMenuTitle";
import NavMenuButton from "./NavMenuButton";

class CategoryMenus extends Component{
    constructor(props){
        super(props);
        this.state = { list : [], loading : false, error : null };
    }

    componentDidMount(){
        const { categoryAction } = this.props;
        categoryAction.fetchCategoryListAction();
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { list, loading, error } = prevState;
        const { category } = nextProps;
        if(
            category.list !== list || category.loading !== loading || category.error !== error
        ) {
            return {
                list : category.list, loading : category.loading, error : category.error
            };
        }
        return null;
    }

    render(){
        const { list, loading, error } = this.state;
        let menuView;
        if(list.length > 0){
            menuView = list.map((category, idx) => (
                <NavMenuButton key={`category_${idx}`} to={`/category/_move?cid=${category.id}&pg=1`}>
                    <i className="fas fa-book" /> {category.name}
                </NavMenuButton>
            ));
        } else if(error !== null){
            menuView = (
                <NavMenuTitle color={'red'}>
                    <h6 className="w3-text-white"><i className="fas fa-warning" /> {error}</h6>
                </NavMenuTitle>
            );
        } else if(loading){
            menuView = (
                <NavMenuTitle color={'yellow'}>
                    <h6 className="w3-text-black"><i className="fas fa-spinner fa-spin" /> Loading</h6>
                </NavMenuTitle>
            );
        }
        return(
            <nav id="category_menu" className="my_menu">
                <ul>
                    <NavMenuTitle color={'orange'}>
                        <h6 className="w3-text-white">Categories</h6>
                    </NavMenuTitle>
                    {menuView}
                </ul>
            </nav>
        )
    }
}
export default CategoryMenus;