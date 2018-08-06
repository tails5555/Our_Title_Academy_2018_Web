import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class CategoryMenu extends Component{
    handleClick(event){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    componentWillMount(){
        this.props.loadCategories();
    }

    componentWillUnmount(){
        this.props.resetLoadCategories();
    }
    render(){
        const { categories, error } = this.props.menuCategories;
        let menuList;
        if(categories.length > 0){
            menuList = categories.map((category, idx) => <li key={`category_${idx}`} onClick={this.handleClick.bind(this)}><Link to={`/category/${category.id}/_move`}>{category.name}</Link></li>)
        }else if(error !== null){
            menuList = <li onClick={this.handleClick.bind(this)}><Link to="/category/">카테고리를 불러오는 중 오류가 발생했습니다.</Link></li>
        }
        return(
            <nav id="category_menu" className="my_menu">
                <ul>
                    <li>
                        <div className="w3-panel w3-pink w3-round-large w3-center">
                            <h6 className="w3-text-white">Categories</h6>
                        </div>
                    </li>
                    {menuList}
                </ul>
            </nav>
        )
    }
}
export default CategoryMenu;