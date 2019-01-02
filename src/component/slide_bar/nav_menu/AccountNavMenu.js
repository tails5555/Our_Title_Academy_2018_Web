import React, { Fragment } from 'react';

import { HomeMenu, MyMenu, TodayMenu, NoticeMenu, AdminMenu, ManagerMenu } from './SmallUnitMenu';
import {MajorTitleHeader} from "../../unit_component/header";

const ManagerNavMenu = ({ userType }) => (
    <Fragment>
        <nav id="menu" className="my_menu">
            <MajorTitleHeader title={'메뉴'} />
            <ul>
                <HomeMenu />
                <MyMenu />
                {
                    userType === 'ADMIN' ? <AdminMenu /> : userType === 'MANAGER' ? <ManagerMenu /> : null
                }
                <TodayMenu />
                <NoticeMenu />
            </ul>
        </nav>
    </Fragment>
);

export default ManagerNavMenu;