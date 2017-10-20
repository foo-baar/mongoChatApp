import React, { Component } from 'react';

class User extends Component {
    getAvatar(userName) {
        return `https://twitter.com/${userName}/profile_image?size=mini`;
    }
    listOflineUsers(onlineUsers) {
        if (onlineUsers !== null) {
            return onlineUsers.map((i) => {
                return <a className="list-group-item list-group-item-action rounded" data-toggle="list" href="#" role="tab" onClick={this.props.displayMsg} data-socketid={i.socketId} key={i.socketId}>
                    <img src={this.getAvatar(i.nickName)} alt='' className="rounded-circle" />&nbsp;
                                {i.nickName}
                </a>
            });
        }
    }
    render() {
        return (
            <div className="listOflineUsers list-group" role="tablist">
                <a className="list-group-item list-group-item-action active" data-socketid="general" onClick={this.props.displayMsg} data-toggle="list" href="#" role="tab">General Room</a>
                {
                    this.listOflineUsers(this.props.users)
                }
            </div>
        );
    }
}
export default User;