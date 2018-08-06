import React from 'react';
import {Link} from 'react-router-dom';
function handleClick(event){
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}
const UserNavMenu = () =>
    <nav id="menu" className="my_menu">
        <header className="major">
            <h2>메뉴</h2>
        </header>
        <ul>
            <li onClick={handleClick.bind(this)}><Link to="/">Home</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/admin_manager_faq">관리자에게 부탁드립니다.</Link></li>
            <li>
                <div className="w3-panel w3-pink w3-round-large w3-center">
                    <h6 className="w3-text-white">My Menu</h6>
                </div>
            </li>
            <li onClick={handleClick.bind(this)}><Link to="/my/info_manage">내 정보 관리</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/my/profile_change">프로필 사진 관리</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/my/title_manage">나의 제목 관리</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/my/photo_manage">나의 사진 관리</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/my/volunteer_fire">회원 탈퇴</Link></li>
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
            <li onClick={handleClick.bind(this)}><Link to="/notice/faq">원장님에게 바란다</Link></li>
        </ul>
    </nav>

export default UserNavMenu;