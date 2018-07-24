import React from 'react';
import {Link} from 'react-router-dom';
function handleClick(event){
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}
const ManagerNavMenu = () =>
    <nav id="menu" className="my_menu">
        <header className="major">
            <h2>메뉴</h2>
        </header>
        <ul>
            <li onClick={handleClick.bind(this)}><Link to="/">Home</Link></li>
            <li>
                <div class="w3-panel w3-pink w3-round-large w3-center">
                    <h6 class="w3-text-white">My Menu</h6>
                </div>
            </li>
            <li onClick={handleClick.bind(this)}><Link to="/my/info_manage">내 정보 관리</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/my/profile_change">프로필 사진 관리</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/my/title_manage">나의 제목 관리</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/my/photo_manage">나의 사진 관리</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/my/volunteer_fire">회원 탈퇴</Link></li>
            <li>
                <div class="w3-panel w3-pink w3-round-large w3-center">
                    <h6 class="w3-text-white">Manager Menu</h6>
                </div>
            </li>
            <li onClick={handleClick.bind(this)}><Link to="/manager/user_list">회원 목록 관리</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/manager/photo_agree">실시간 사진 허가</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/manager/appointing">Manager 임명</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/manager/open_faq">관리자 FAQ 열람</Link></li>
            <li>
                <div class="w3-panel w3-pink w3-round-large w3-center">
                    <h6 class="w3-text-white">Today Title</h6>
                </div>
            </li>
            <li onClick={handleClick.bind(this)}><Link to="/today/best">오늘의 Best</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/today/battle">오늘의 Title Battle</Link></li>
            <li>
                <div class="w3-panel w3-pink w3-round-large w3-center">
                    <h6 class="w3-text-white">Categories</h6>
                </div>
            </li>
            <li onClick={handleClick.bind(this)}><Link to="/category/1">영화</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/category/2">예능</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/category/3">드라마</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/category/4">애니/만화</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/category/5">과학/개발</Link></li>
        </ul>
    </nav>

export default ManagerNavMenu;