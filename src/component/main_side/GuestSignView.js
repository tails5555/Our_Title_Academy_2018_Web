import React, { Fragment } from 'react';
import { SignModelForm } from "../unit_component/form_model";
import { MainTitleHeader, MajorTitleHeader } from "../unit_component/header";

const GuestSignView = () => (
    <Fragment>
        <section id="guest_sign_up_view">
            <MainTitleHeader title="SIGN UP" />
            <MajorTitleHeader title="회원 가입"/>
            <SignModelForm />
        </section>
    </Fragment>
);

export default GuestSignView;