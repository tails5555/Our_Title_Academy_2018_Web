import React, { Fragment } from 'react';
import NavMenuTitle from './NavMenuTitle';
import NavMenuButton from './NavMenuButton';

const UnitMenu = ({ title, color, titleColor, children }) => (
    <Fragment>
        <NavMenuTitle color={color}>
            <h6 className={`w3-text-${titleColor}`}>{ title }</h6>
        </NavMenuTitle>
        { children }
    </Fragment>
);

export const HomeMenu = () => (
    <UnitMenu title={'HOME'} color={'pink'} titleColor={'white'}>
        <NavMenuButton to="/">
            <i className="fas fa-home" /> HOME
        </NavMenuButton>
    </UnitMenu>
);

export const TodayMenu = () => (
    <UnitMenu title={'TODAY TITLES'} color={'teal'} titleColor={'white'}>
        <NavMenuButton to="/today/best">
            <i className="fas fa-crown" /> 오늘의 BEST
        </NavMenuButton>
        <NavMenuButton to="/today/battle">
            <i className="fas fa-chalkboard-teacher" /> 오늘의 BATTLE
        </NavMenuButton>
    </UnitMenu>
);

export const NoticeMenu = () => (
    <UnitMenu title={'OUR NOTICE'} color={'light-green'} titleColor={'black'}>
        <NavMenuButton to="/notice/list/_refresh?pg=1">
            <i className="fas fa-newspaper" /> 제목학원 가정통신문
        </NavMenuButton>
        <NavMenuButton to="/notice/faq/_refresh?pg=1">
            <i className="fas fa-paper-plane" /> 원장님에게 원합니다
        </NavMenuButton>
    </UnitMenu>
);

export const AccountMenu = () => (
    <UnitMenu title={'ACCOUNT MENU'} color={'blue'} titleColor={'white'}>
        <NavMenuButton to="/account/sign_up">
            <i className="fas fa-user-plus" /> 회원 가입
        </NavMenuButton>
        <NavMenuButton to="/account/find_loginId">
            <i className="fas fa-question-circle" /> 아이디 찾기
        </NavMenuButton>
    </UnitMenu>
);

export const MyMenu = () => (
    <UnitMenu title={'MY MENU'} color={'purple'} titleColor={'white'}>
        <NavMenuButton to="/create_request">
            <i className="fas fa-pen-square" /> 제목학원 사연 신청
        </NavMenuButton>
        <NavMenuButton to="/my/info_manage">
            <i className="fas fa-id-card" /> 내 정보 관리
        </NavMenuButton>
        <NavMenuButton to="/my/profile_change">
            <i className="fas fa-user-circle" /> 프로필 사진 관리
        </NavMenuButton>
        <NavMenuButton to="/my/title_statistic">
            <i className="fas fa-line-chart" /> 내가 올린 제목 통계
        </NavMenuButton>
        <NavMenuButton to="/my/request_statistic">
            <i className="fas fa-bar-chart" /> 내가 올린 사연 통계
        </NavMenuButton>
        <NavMenuButton to="/my/volunteer_fire">
            <i className="fas fa-user-minus" /> 회원 탈퇴
        </NavMenuButton>
    </UnitMenu>
);

export const ManagerMenu = () => (
    <UnitMenu title={'MANAGER MENU'} color={'gray'} titleColor={'black'}>
        <NavMenuButton to="/manager/user_list">
            <i className="fas fa-users" /> 회원 목록 관리
        </NavMenuButton>
        <NavMenuButton to="/manager/photo_agree">
            <i className="fas fa-check-double" /> 제목학원 사연 허가
        </NavMenuButton>
        <NavMenuButton to="/common_owner/open_faq/_refresh?pg=1">
            <i className="fas fa-question-circle" /> 궁금사항 열람 및 해결
        </NavMenuButton>
    </UnitMenu>
);

export const AdminMenu = () => (
    <UnitMenu title={'ADMIN MENU'} color={'orange'} titleColor={'black'}>
        <NavMenuButton to="/admin/user_list">
            <i className="fas fa-users" /> 회원 목록 관리
        </NavMenuButton>
        <NavMenuButton to="/admin/photo_agree">
            <i className="fas fa-check-double" /> 제목학원 사연 허가
        </NavMenuButton>
        <NavMenuButton to="/admin/manager/title/_refresh">
            <i className="fas fa-tasks" /> 모든 제목 관리
        </NavMenuButton>
        <NavMenuButton to="/admin/manager/request/_refresh">
            <i className="fas fa-book-open" /> 모든 사연 관리
        </NavMenuButton>
        <NavMenuButton to="/common_owner/open_faq/_refresh?pg=1">
            <i className="fas fa-question-circle" /> 궁금사항 열람 및 해결
        </NavMenuButton>
    </UnitMenu>
)