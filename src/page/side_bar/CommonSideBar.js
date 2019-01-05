import React, { Fragment } from 'react';

import { TotalSearchForm } from "../../component/unit_component/form_model";
import { CategoryMenuContainer, TodayRankCardViewContainer } from "../../container";
import { DevelopInfo } from "../../component/slide_bar";

const CommonSideBar = ({ children }) => (
    <Fragment>
        <div className="inner">
            <TotalSearchForm />
            { children }
            <CategoryMenuContainer />
            <TodayRankCardViewContainer />
            <DevelopInfo />
        </div>
    </Fragment>
);

export default CommonSideBar;