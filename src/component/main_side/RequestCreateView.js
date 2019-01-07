import React, { Fragment } from 'react';
import { MainTitleHeader, MajorTitleHeader } from "../unit_component/header";
import { RequestSaveForm } from "../unit_component/form_model";

const RequestCreateView = ({ accessor }) => (
    <Fragment>
        <section id="request_create_view">
            <MainTitleHeader title="CREATE REQUEST" />
            <MajorTitleHeader title="내 사진에 제목을 붙어주세요." />
            <RequestSaveForm element={null} userId={accessor && accessor.principal && accessor.principal.loginId} />
        </section>
    </Fragment>
);

export default RequestCreateView;