import React, { Fragment } from 'react';

import { GuestNavMenu } from "../../component/slide_bar/nav_menu";
import { LoginActionFormContainer } from "../../container";

import CommonSideBar from "./CommonSideBar";

const AnonymousSideBar = () => (
    <Fragment>
        <CommonSideBar>
            <LoginActionFormContainer />
            <GuestNavMenu />
        </CommonSideBar>
    </Fragment>
);

export default AnonymousSideBar;