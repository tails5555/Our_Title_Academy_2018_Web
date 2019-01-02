import React, { Fragment } from 'react';

import { AccountNavMenu } from "../../component/slide_bar/nav_menu";
import { TotalSearch, DevelopInfo } from "../../component/slide_bar";
import { UserInfoContainer, CategoryMenuContainer, TodayRankCardViewContainer } from "../../container";

const UserExistedSideBar = (props) => (
    <Fragment>
        <div className="inner">
            <TotalSearch />
            <UserInfoContainer />
            <AccountNavMenu userType={props.type} />
            <CategoryMenuContainer />
            <TodayRankCardViewContainer />
            <DevelopInfo />
        </div>
    </Fragment>
);

export default UserExistedSideBar;