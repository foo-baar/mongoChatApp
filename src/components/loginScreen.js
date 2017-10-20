import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {signIn: false};
    }

    handleLogin(e){
        e.preventDefault();
        let userName = this.refs.twitterId.value;
        if(userName){
            sessionStorage.setItem('isLoggedIn', userName);
            this.props.loginHandler(userName);
        }
    }
    render() {
        return (
            <div className="text-white text-center  mt-4">
                <h5>
                    Enter your Twitter ID to start chatting !
                </h5>
                <form onSubmit={this.handleLogin.bind(this)}>
                    <div className="input-group mt-3">
                        <div className="input-group-addon">＠</div>
                        <input type="text" className="form-control" ref="twitterId" placeholder="Twitter Id" />
                        <div className="col-auto">
                            <input type="submit" className="btn btn-outline-warning" value="Go..." />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default Login;