import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import GuestRouter from './GuestRouter'
import AdminRouter from "./AdminRouter";
import ManagerRouter from "./ManagerRouter";
import UserRouter from "./UserRouter";
import NavMenu from "../component/slide_bar/NavMenu";
import {AnonymousSideBar, UserExistedSideBar} from "../page/side_bar";

class ApplicationRouter extends Component {
    componentWillMount(){
        this.props.fetchPrincipalFromServer();
    }
    componentWillUnmount(){
        this.props.resetFetchPrincipalFromServer();
    }
    render(){
        let router, sidebar;
        const { principal } = this.props.accessUser;
        if(principal === null){
            router = <GuestRouter />
            sidebar = <AnonymousSideBar />
        } else {
            sidebar = <UserExistedSideBar />
            let type = principal.type;
            switch(type){
                case 'ADMIN' :
                    router = <AdminRouter />;
                    break;
                case 'MANAGER' :
                    router = <ManagerRouter />;
                    break;
                case 'USER' :
                    router = <UserRouter />;
                    break;
            }
        }
        return(
            <BrowserRouter>
                <div id="wrapper">
                    <div id="main">
                        {router}
                    </div>
                    <div id="sidebar">
                        {sidebar}
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
export default ApplicationRouter;