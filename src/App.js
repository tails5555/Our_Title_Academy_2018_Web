import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavMenu from './component/slide_bar/NavMenu';
import SlideBarPage from "./page/SlideBarPage";

class App extends Component {
    render() {
        return (
            <div className="App">
                <SlideBarPage />
            </div>
        );
    }
}

export default App;
