import React, { Component, Fragment, Children as childrenAPI } from 'react';
import {AlertBoxNote} from "../alert_box";

import './sticky_style.css';

class SelectDisplayBox extends Component {
    constructor(props){
        super(props);
        this.state = { selected : 0 };
    }

    handleClickChangeSelected = (idx) => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        this.setState({
            selected : idx
        });
    }

    componentDidMount() {
        window.onscroll = function () {
            stickyFunction();
        }

        var btnList = document.getElementById("display_btn_list");
        var sticky = btnList.offsetTop;

        function stickyFunction() {
            if (window.pageYOffset > sticky) {
                btnList.classList.add("sticky");
            } else {
                btnList.classList.remove("sticky");
            }
        }
    }

    render(){
        const { children, btnTitles } = this.props;
        const { selected } = this.state;
        const childrenSize = childrenAPI.count(children);

        if(btnTitles.length !== childrenSize){
            return (
                <Fragment>
                    <AlertBoxNote
                        id={"has_error_note"}
                        icon={"fas fa-warning"}
                        title={"버튼 요소의 수와 자식 컴포넌트의 수가 다릅니다."}
                        context={"개발 측의 오류로, 해결 될 때까지 기다려주시면 감사하겠습니다 :)"}
                    />
                </Fragment>
            );
        }

        const btnList = btnTitles.map((btnContext, idx) => (
            <button
                key={`display_btn_${idx}`}
                style={{ margin : '10px' }}
                className={(selected === idx) ? "w3-small w3-button w3-pink" : "w3-small w3-button w3-white"}
                onClick={() => this.handleClickChangeSelected(idx)}
            >
                <i className={ btnContext.icon } /> { window.innerWidth > 768 ? btnContext.label : null }
            </button>
        ));

        const displayBox = childrenAPI.map(children, (child, idx) => (
            <div
                key={`display_children_${idx}`}
                className="w3-animate-opacity"
            >
                { selected === idx ? child : null }
            </div>
        ));


        return (
            <Fragment>
                <div id="display_btn_list" className="w3-right-align">
                    { btnList }
                </div>
                <div id="display_children_box_list" style={{ margin : '10px' }}>
                    { displayBox }
                </div>
            </Fragment>
        );
    }
}

export default SelectDisplayBox;