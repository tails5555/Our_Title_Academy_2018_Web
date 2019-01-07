import React, { Fragment } from 'react';

import { AccountMenu, NoticeMenu, TodayMenu, HomeMenu } from "./SmallUnitMenu";
import { MajorTitleHeader } from "../../unit_component/header";

const GuestNavMenu = () => (
    <Fragment>
        <nav id="menu" className="my_menu">
            <MajorTitleHeader title={'메뉴'} />
            <ul>
                <HomeMenu />
                <AccountMenu />
                <NoticeMenu />
                <TodayMenu />
            </ul>
        </nav>
    </Fragment>
);

export default GuestNavMenu;