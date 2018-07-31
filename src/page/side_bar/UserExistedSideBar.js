import React from 'react';
import { TotalSearch } from "../../component/slide_bar";
import { UserInfoContainer, CategoryMenuContainer } from "../../container";
import DevelopInfo from "../../component/slide_bar/DevelopInfo";
import RealPopular from "../../component/slide_bar/RealPopular";
import {UserNavMenu, ManagerNavMenu, AdminNavMenu} from "../../component/slide_bar/nav_menu";

const UserExistedSideBar = (props) => {
    let navMenu;
    switch(props.type){
        case 'ADMIN' :
            navMenu = <AdminNavMenu />;
            break;
        case 'MANAGER' :
            navMenu = <ManagerNavMenu />;
            break;
        default :
            navMenu = <UserNavMenu />;
            break;
    }

    return (
        <div className="inner">
            <TotalSearch />
            <UserInfoContainer />
            {navMenu}
            <CategoryMenuContainer />
            <RealPopular />
            <DevelopInfo />
        </div>
    )
}

export default UserExistedSideBar;