import React, { Fragment } from 'react';
import {MainTitleHeader} from "../unit_component/header";
import { RequestSaveForm } from "../unit_component/form_model";

const RequestCreateView = ({ accessUser }) => (
    <Fragment>
        <section>
            <section id="request_create_view">
                <MainTitleHeader title="CREATE REQUEST" />
            </section>
            <header className="major">
                <h2>내 사진에 제목을 붙어주세요.</h2>
            </header>
            <RequestSaveForm element={null} userId={accessUser && accessUser.principal && accessUser.principal.loginId} />
        </section>
    </Fragment>
);

export default RequestCreateView;