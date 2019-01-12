import React, { Fragment } from 'react';
import { SignModelForm } from "../unit_component/form_model";
import { MainTitleHeader, MajorTitleHeader } from "../unit_component/header";

const UserSignView = () => (
    <Fragment>
        <section id="guest_sign_up_view">
            <MainTitleHeader title="SIGN INFO UPDATE" />
            <MajorTitleHeader title="회원 정보 수정" />
            <SignModelForm />
        </section>
    </Fragment>
);

export default UserSignView;