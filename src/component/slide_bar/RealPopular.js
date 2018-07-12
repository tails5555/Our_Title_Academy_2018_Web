import React, {Component} from 'react';
class RealPopular extends Component{
    render(){
        return(
            <section>
                <header className="major">
                    <h2>실시간 인기 제목</h2>
                </header>
                <div className="mini-posts">
                    <article>
                        <a href="#" className="image"><img src="../my_image/sinchan.jpg" alt="" /></a>
                        <p><b>짱구 : 삼겹살이 바베큐 구이가 되었네</b></p>
                        <p><i className="icon fa-book"></i> 애니/만화 <br/> <i className="icon fa-star"></i> 100 <br/> <i className="icon fa-comments"></i> 30</p>
                    </article>
                    <article>
                        <a href="#" className="image"><img src="../my_image/leemb.jpg" alt="" /></a>
                        <p><b>어이, 내가 이겼으니까 벌칙으로 녹조라떼 원샷해라!</b></p>
                        <p><i className="icon fa-book"></i> 정치/사회 <br/> <i className="icon fa-star"></i> 74 <br/> <i className="icon fa-comments"></i> 7</p>
                    </article>
                    <article>
                        <a href="#" className="image"><img src="../my_image/dok2.jpg" alt="" /></a>
                        <p><b>물이나 쳐 먹어, 색기들아!!!</b></p>
                        <p><i className="icon fa-book"></i> 연예인 <br/> <i className="icon fa-star"></i> 80 <br/> <i className="icon fa-comments"></i> 8008</p>
                    </article>
                </div>
                <ul className="actions">
                    <li><a href="../composition/today_best.html" className="button">더 알아보기</a></li>
                </ul>
            </section>

        )
    }
}
export default RealPopular;