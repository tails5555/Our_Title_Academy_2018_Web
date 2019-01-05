import React, { Fragment } from 'react';

import { GuestNavMenu } from "../../component/slide_bar/nav_menu";
import { LoginFormContainer } from "../../container";

import CommonSideBar from "./CommonSideBar";

const AnonymousSideBar = () => (
    <Fragment>
        <CommonSideBar>
            <LoginFormContainer />
            <GuestNavMenu />
        </CommonSideBar>
    </Fragment>
);

export default AnonymousSideBar;