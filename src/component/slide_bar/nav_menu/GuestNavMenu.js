import React from 'react';
import {Link} from 'react-router-dom';
function handleClick(event){
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}
const GuestNavMenu = () =>
    <nav id="menu" className="my_menu">
        <header className="major">
            <h2>메뉴</h2>
        </header>
        <ul>
            <li onClick={handleClick.bind(this)}><Link to="/">Home</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/admin_manager_faq">관리자에게 부탁드립니다.</Link></li>
            <li>
                <div class="w3-panel w3-pink w3-round-large w3-center">
                    <h6 class="w3-text-white">Account Menu</h6>
                </div>
            </li>
            <li onClick={handleClick.bind(this)}><Link to="/account/sign_up">회원가입</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/account/find_loginId">아이디 찾기</Link></li>
            <li onClick={handleClick.bind(this)}><Link to="/account/update_password">비밀번호 변경</Link></li>
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

export default GuestNavMenu;