import React, {Component} from 'react';
class DevelopInfo extends Component{
    render(){
        return(
            <div>
                <section>
                    <header className="major">
                        <h2>Project Info</h2>
                    </header>
                    <p>SKHU Software Engineering. KangDB.</p>
                    <p>개발로 사람들에게 즐거움을 선사하고 싶습니다. 이용 시 문의사항 있으시면 아래 이메일로 통보 바랍니다.</p>
                    <ul className="contact">
                        <li className="fa-envelope-o"><a href="#">hogu9401@gmail.com</a></li>
                        <li className="fa-phone">010 - 6683 - 0903</li>
                        <li className="fa-home">(17077) 경기도 용인시 기흥구<br />
                            중부대로 820</li>
                    </ul>
                </section>

                <footer id="footer">
                    <p className="copyright">&copy; 2018 Seong Kong Hoe Univ. Software Engineering. All rights reserved. Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
                </footer>
            </div>
        )
    }
}
export default DevelopInfo;