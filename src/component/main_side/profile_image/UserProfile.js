import React, {Component} from 'react';
import defaultProfile from '../../resource_image/default_profile.png';
import axios from "axios";

const RESOURCE_ROOT_URL = 'http://127.0.0.1:8081/UserAPI/auth/resource/profile';

class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state = { status : 0 };
    }

    componentWillReceiveProps(nextProps){
        if (this.props.loginId !== nextProps.loginId) {
            this.propsUpdating(nextProps.loginId);
        }
    }

    propsUpdating(loginId){
        let self = this;
        axios.get(`${RESOURCE_ROOT_URL}/image_profile/${loginId}`)
            .then(response =>
                self.setState({ status : response.status })
            );
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.status !== nextState.status || nextProps.loginId !== this.props.loginId;
    }

    componentDidMount(){
        let self = this;
        if(this.props.loginId !== '')
            axios.get(`${RESOURCE_ROOT_URL}/image_profile/${this.props.loginId}`)
                .then(response =>
                    self.setState({ status : response.status })
                );
    }

    render(){
        return (
            <img src={(this.state.status === 200) ? `${RESOURCE_ROOT_URL}/image_profile/${this.props.loginId}` : defaultProfile} alt=""
                 style={{
                     width : '100%',
                     height : 'auto'
                 }}
                 className="w3-image w3-round-large"
            />
        )
    }
}
export default UserProfile;