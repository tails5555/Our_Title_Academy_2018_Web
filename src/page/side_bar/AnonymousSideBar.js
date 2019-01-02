import React, { Fragment } from 'react';

import { GuestNavMenu } from "../../component/slide_bar/nav_menu";
import { TotalSearch, DevelopInfo } from "../../component/slide_bar";
import { LoginFormContainer, CategoryMenuContainer, TodayRankCardViewContainer } from "../../container";

const AnonymousSideBar = () => (
    <Fragment>
        <div className="inner">
            <TotalSearch />
            <LoginFormContainer />
            <GuestNavMenu />
            <CategoryMenuContainer />
            <TodayRankCardViewContainer />
            <DevelopInfo />
        </div>
    </Fragment>
);

export default AnonymousSideBar;