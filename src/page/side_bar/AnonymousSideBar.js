import React from 'react';
import { TotalSearch } from "../../component/slide_bar";
import { LoginFormContainer, CategoryMenuContainer, TodayRankContainer } from "../../container";
import DevelopInfo from "../../component/slide_bar/DevelopInfo";
import GuestNavMenu from "../../component/slide_bar/nav_menu/GuestNavMenu";
const AnonymousSideBar = () =>
    (
        <div className="inner">
            <TotalSearch />
            <LoginFormContainer />
            <GuestNavMenu />
            <CategoryMenuContainer />
            <TodayRankContainer />
            <DevelopInfo />
        </div>
    );

export default AnonymousSideBar;