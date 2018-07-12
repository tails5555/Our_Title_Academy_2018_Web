import React, {Component} from 'react';
class LoginForm extends Component{
    render(){
        return(
            <section id="user_login" className="alt">
                <header className="major">
                    <h2>Login</h2>
                </header>
                <form>
                    <input type="text" name="username" id="username" placeholder="사용자 아이디" />
                    <br/>
                    <input type="password" name="password" id="password" placeholder="사용자 비밀번호" />
                    <br/>
                    <button className="button primary fit large">Login!!!</button>
                </form>
            </section>
        )
    }
}
export default LoginForm;