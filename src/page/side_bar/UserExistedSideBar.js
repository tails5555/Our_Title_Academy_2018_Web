import React, { Fragment } from 'react';

import { AccountNavMenu } from "../../component/slide_bar/nav_menu";
import { UserInfoContainer } from "../../container";

import CommonSideBar from "./CommonSideBar";

const UserExistedSideBar = (props) => (
    <Fragment>
        <CommonSideBar>
            <UserInfoContainer />
            <AccountNavMenu userType={props.type} />
        </CommonSideBar>
    </Fragment>
);

export default UserExistedSideBar;