import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OnlineUser from './onlineUserList';
import io from 'socket.io-client';
let socket;

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = { conversation: [], onlineUsers: null, currentUser: props.user, currentUserSocketId: null, privateMsg: "general" }
    }
    handleLogout(e) {
        sessionStorage.removeItem('isLoggedIn')
        socket.disconnect();
        this.props.logoutHandler();
    }
    sendMessages(key) {
        if (key.which === 13 && key.shiftKey === false && (key.target.value.trim().length > 0)) {
            let selectUserId = this.state.privateMsg,
                newMsg = {
                    from: this.state.currentUser,
                    message: key.target.value
                };
            if (selectUserId === "general") {
                socket.emit('send-message', newMsg);
            }
            else {
                newMsg.to = selectUserId;
                newMsg.from = this.state.currentUserSocketId;
                socket.emit('send-private-message', newMsg);

                let sender = newMsg.to;
                let conversation = this.state.conversation;

                if (!conversation[sender]) {
                    conversation[sender] = []
                }
                conversation[sender].push(newMsg);
                this.setState({ conversation: conversation });
            }
            key.target.value = '';
            key.preventDefault();
        }
    }
    displayMessages(msgSender) {
        try {
            let sender = this.state.privateMsg || 'general',
                msgs = this.state.conversation,
                onlineUsers = this.state.onlineUsers,
                currentUSocketId = this.state.currentUserSocketId,
                senderName = null;

            if (msgs[sender]) {
                return msgs[sender].map(function (m, index) {
                    if (sender === 'general') {
                        senderName = m.from;
                    } else if (m.from === currentUSocketId) {
                        senderName = "You";
                    } else {
                        senderName = onlineUsers.filter(i => { return (i.socketId === m.from) })[0].nickName;
                    }
                    return <p className="mb-0" key={index}><b className="text-secondary">{senderName}</b> : {m.message} </p>
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    displayPrivateMessage(e) {
        this.removeNotoficaiton(e.target.dataset['socketid']);
        this.setState({ privateMsg: e.target.dataset['socketid'] });
    }
    removeNotoficaiton(sender) {
        let selectUserId = ReactDOM.findDOMNode(this.refs.usersList).querySelectorAll(`[data-socketid='${sender}']`) || null;

        if ((typeof (selectUserId) !== "undefined" || selectUserId !== null) && selectUserId[0].getElementsByClassName('badge').length > 0) {
            selectUserId[0].getElementsByClassName('badge')[0].remove();
        }
    }
    pushNotification(sender) {
        if (sender !== this.state.privateMsg) {
            let selectUserId = ReactDOM.findDOMNode(this.refs.usersList).querySelectorAll(`[data-socketid='${sender}']`) || null;

            if (selectUserId[0].getElementsByTagName('span').length === 0) {
                let badge = document.createElement('span');
                badge.className = 'badge badge-danger badge-pill float-right';
                badge.innerHTML = '+'
                selectUserId[0].appendChild(badge);
            }
        }
    }
    componentWillMount() {
        socket = io.connect('localhost:4000');
    }
    render() {
        return (
            <div className="row p-3">
                <div className="col-md-12 nopadding text-white text-center">
                    <h5>Welcome {this.props.user}</h5>
                </div>
                <div className="col-md-4 nopadding bg-light rounded">
                    <div className="list-group" ref="usersList">
                        <OnlineUser users={this.state.onlineUsers} displayMsg={this.displayPrivateMessage.bind(this)} />
                    </div>
                </div>
                <div className="col-md-8 nopadding">
                    <div className="card border-0">
                        <div className="card-body">
                            <div id="messages" ref="msgBox" className="card-text">
                                {this.displayMessages()}
                            </div>
                        </div>
                    </div>
                </div>
                <textarea name="txtArea" className="form-control mt-3 mb-3" placeholder="Enter Message..(press enter to send)" onKeyPress={this.sendMessages.bind(this)}></textarea>
                <div className="col-md-12 text-center nopadding">
                    <button type="button" onClick={this.handleLogout.bind(this)} className="btn btn-dark btn-lg btn-block">Logout !</button>
                </div>
            </div>
        );
    }
    componentDidMount() {
        try {
            if (socket !== undefined) {
                socket.emit('join', {
                    nickName: this.props.user
                });
                socket.on('onlineUsers', data => {
                    this.setState({
                        onlineUsers: data.filter(i => { return i.nickName !== this.state.currentUser }),
                        currentUserSocketId: data.filter(i => { return i.nickName === this.state.currentUser })[0].socketId || null
                    });
                });
                socket.on('message-received', data => {
                    let conversation = this.state.conversation;
                    if (!conversation.general) {
                        conversation.general = []
                    }
                    conversation.general.push(data);
                    this.setState({ conversation: conversation });
                });
                socket.on('private-message', this.onPrivateMessage.bind(this));
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    onPrivateMessage(data) {
        let sender = data.from;
        let conversation = this.state.conversation;

        if (!conversation[sender]) {
            conversation[sender] = []
        }
        conversation[sender].push(data);
        this.setState({ conversation: conversation });
        this.pushNotification(data.from);
    }
}
export default ChatRoom;