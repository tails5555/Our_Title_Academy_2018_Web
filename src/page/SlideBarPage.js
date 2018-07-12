import React, {Component} from 'react';
import DevelopInfo from "../component/slide_bar/DevelopInfo";
import LoginForm from "../component/slide_bar/LoginForm";
import NavMenu from "../component/slide_bar/NavMenu";
import RealPopular from "../component/slide_bar/RealPopular";
import TotalSearch from "../component/slide_bar/TotalSearch";
class SlideBarPage extends Component{
    render(){
        return(
            <div id="sidebar">
                <div class="inner">
                    <TotalSearch />
                    <LoginForm />
                    <NavMenu />
                    <RealPopular />
                    <DevelopInfo />
                </div>
            </div>
        )
    }
}
export default SlideBarPage;