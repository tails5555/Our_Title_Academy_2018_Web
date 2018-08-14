import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import madongseok from '../../resource_image/madongseok.jpg';
class MainHeader extends Component{
    topping(){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    handleClick(event){
        this.topping();
    }

    render(){
        return(
            <div>
                <header id="header">
                    <span className="logo"><strong>Our Title Academy 2018</strong> - MAIN</span>
                </header>
                <br/><br/>
                <section id="banner">
                    <div className="content">
                        <header>
                            <h2>제목으로 승부한다!!!<br />우리들의 제목학원, 2018!!!</h2>
                            <br/>
                            <p>평범한 사진에 여러분의 재취를 발휘하라!</p>
                        </header>
                        <p>사진은 누구나 마음껏 올릴 수 있습니다. 그러나 사진에 있는 제목은 여러분들의 재치가 필요합니다. 다른 사람이 올리는 사진에 여러분의 기발한 개그를 뽐내어 웃음 바다로 만들어 주세요 :)</p>
                        <div className="w3-center">
                            <Link to="/today/battle" className="button big" onClick={this.handleClick.bind(this)}>오늘의 사진으로 제목 올리기</Link>
                            <br/><br/>
                            <Link to="/today/best" className="button big" onClick={this.handleClick.bind(this)}>베스트 사진 목록 보기</Link>
                        </div>
                    </div>
                    <span className="image object">
                        <img src={madongseok} />
                    </span>
                </section>
            </div>
        )
    }
}
export default MainHeader;