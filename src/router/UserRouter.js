import React, {Component} from 'react';

import CommonRouter from './CommonRouter';
import AccountRouter from './AccountRouter';

class UserRouter extends Component{
    render(){
        return(
            <div className="inner">
                <CommonRouter />
                <AccountRouter />
            </div>
        )
    }
}
export default UserRouter;