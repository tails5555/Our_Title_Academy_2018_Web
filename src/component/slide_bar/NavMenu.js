import React, {Component} from 'react';
class NavMenu extends Component{
    render(){
        return(
            <nav id="menu">
                <header className="major">
                    <h2>메뉴</h2>
                </header>
                <ul>
                    <li><a href="../index.html">Home</a></li>
                    <li><a href="../composition/today_best.html">오늘의 Best</a></li>
                    <li><a href="../composition/today_battle.html">오늘의 Title Battle</a></li>
                    <li><a href="../composition/add_photo.html">내 사진에 제목을 붙어주세요.</a></li>
                    <li>
                        <span className="opener">Categories</span>
                        <ul>
                            <li><a href="../composition/category.html">영화</a></li>
                            <li><a href="../composition/category.html">예능</a></li>
                            <li><a href="../composition/category.html">드라마</a></li>
                            <li><a href="../composition/category.html">애니/만화</a></li>
                            <li><a href="../composition/category.html">과학/개발</a></li>
                            <li><a href="../composition/category.html">정치/사회</a></li>
                            <li><a href="../composition/category.html">음악/미술</a></li>
                            <li><a href="../composition/category.html">체육/스포츠</a></li>
                            <li><a href="../composition/category.html">일상/셀카</a></li>
                            <li><a href="../composition/category.html">연예인</a></li>
                        </ul>
                    </li>
                    <li>
                        <span className="opener">User 메뉴</span>
                        <ul>
                            <li><a href="../user/my_info.html">내 정보 관리</a></li>
                            <li><a href="../user/my_title.html">나의 제목 관리</a></li>
                            <li><a href="../user/my_photo.html">나의 사진 관리</a></li>
                            <li><a href="../user/fire_user.html">회원 탈퇴</a></li>
                        </ul>
                    </li>
                    <li>
                        <span className="opener">Manager 메뉴</span>
                        <ul>
                            <li><a href="../manager/user_list.html">회원 목록 관리</a></li>
                            <li><a href="../manager/photo_agree.html">실시간 사진 허가</a></li>
                            <li><a href="../manager/appointing.html">Manager 임명</a></li>
                            <li><a href="../manager/open_faq.html">관리자 FAQ 열람</a></li>
                        </ul>
                    </li>
                    <li><a href="../composition/manager_faq.html">관리자에게 부탁드립니다.</a></li>
                </ul>
            </nav>
        )
    }
}
export default NavMenu;