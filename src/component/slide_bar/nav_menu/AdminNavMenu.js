import React from 'react';
import {Link} from 'react-router-dom';
function handleClick(event){
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}
const AdminNavMenu = () =>
    <nav id="menu" className="my_menu">
        <header className="major">
            <h2>메뉴</h2>
        </header>
        <ul>
            <li onClick={handleClick.bind(this)}><Link to="/">Home</Link></li>
            <li onClick={handleClick.bind(this)}>
                <div className="w3-panel w3-pink w3-round-large w3-center">
                    <h6 className="w3-text-white">My Menu</h6>
                </div>
            </li>
            <li onClick={handleClick.bind(this)}><Link to="/my/info_manage">내 정보 관리</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/my/profile_change">프로필 사진 관리</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/my/title_statistic">내가 올린 제목 통계</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/my/request_statistic">내가 올린 요청 통계</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/my/volunteer_fire">회원 탈퇴</Link></li>
            <li>
                <div className="w3-panel w3-pink w3-round-large w3-center">
                    <h6 className="w3-text-white">Admin Menu</h6>
                </div>
            </li>
            <li onClick={handleClick.bind(this)}><Link to="/admin/user_list">회원 목록 관리</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/admin/title_manage">모든 제목 관리</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/admin/photo_manage">모든 사진 관리</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/admin/open_faq">관리자 FAQ 열람</Link></li>
            <li>
                <div className="w3-panel w3-pink w3-round-large w3-center">
                    <h6 className="w3-text-white">Today Title</h6>
                </div>
            </li>
            <li onClick={handleClick.bind(this)}><Link to="/today/best">오늘의 Best</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/today/battle">오늘의 Title Battle</Link></li>
            <li>
                <div className="w3-panel w3-pink w3-round-large w3-center">
                    <h6 className="w3-text-white">Our Community</h6>
                </div>
            </li>
            <li onClick={handleClick.bind(this)}><Link to="/create_request">내 사진에 제목을 올려주세요</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/notice/view">제목학원 가정통신문</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/notice/faq_view">FAQ 열람하러 가기</Link></li>
        </ul>
    </nav>

export default AdminNavMenu;