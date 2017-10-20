import React, { Component } from 'react';
import ChatRoom from './components/chatRoom';
import Login from './components/loginScreen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      isLogged: false,
    };
  }
  loginHandler(userName) {
    this.setState({ isLogged: true, userName: sessionStorage.getItem("isLoggedIn")});
  }
  logoutHandler(){
    this.setState({isLogged: false});
  }
  componentWillMount() {
    if (sessionStorage.getItem("isLoggedIn") !== null) {
      this.setState({ userName: sessionStorage.getItem("isLoggedIn"), isLogged: true });
    }
  }
  initialiseScreen() {
    if (this.state.isLogged){
      return <ChatRoom user={this.state.userName} logoutHandler={this.logoutHandler.bind(this)} />;
    }
    return <Login loginHandler={this.loginHandler.bind(this)} />;
  }
  render() {
    return (
      <div className="container">
        <div className="row mt-4 justify-content-md-center ">
          <div className="col-md-7 bg-info rounded z-depth-5 pb-3 pt-3 ">
            <h1 className="text-center pt-2 display-5 text-white">HomeLike Chat <span>💬</span></h1>
            {this.initialiseScreen()}
          </div>
        </div>
      </div>
    );
  }
}
export default App;