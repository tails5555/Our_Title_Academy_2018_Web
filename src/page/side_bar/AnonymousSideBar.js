import React from 'react';
import { TotalSearch } from "../../component/slide_bar";
import {LoginFormContainer} from "../../container";
import DevelopInfo from "../../component/slide_bar/DevelopInfo";
import RealPopular from "../../component/slide_bar/RealPopular";
import GuestNavMenu from "../../component/slide_bar/nav_menu/GuestNavMenu";

const AnonymousSideBar = () =>
    (
        <div className="inner">
            <TotalSearch />
            <LoginFormContainer />
            <GuestNavMenu />
            <RealPopular />
            <DevelopInfo />
        </div>
    );

export default AnonymousSideBar;