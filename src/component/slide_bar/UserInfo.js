import React, {Component} from 'react';
class UserInfo extends Component{
    render(){
        return(
            <section id="user_info" className="mini-posts alt">
                <article>
                    <a href="#" className="image"><img src="../my_image/kimdoohan.jpg" alt="" /></a>
                    <p><b>홍길동 님</b>, 제목을 지어주세요!!!</p>
                    <p>접속 시간 : 2018/11/11 11:11:11</p>
                </article>
                <button className="button primary fit large">Log Out</button>
            </section>
        );
    }
}
export default UserInfo;