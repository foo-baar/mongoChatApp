
## About

Mock chat application created with NodeJs and ReactJs, utilising socket.io.

App currently ask for twitter Id to log-in (with the purpose of getting user AVATAR).

User gets into the General room with a list of other online users.

User can send public messages in the General room or can start a private conversation by selecting user from the available user list.

At present app utilises session based storage (in-memory), on page refresh the user session will expire, however online users list in maintained on the server hence displays all logged-in users.

## Running project locally

Execute the following commands to install the app:

**Install**

```
git clone https://github.com/foo-baar/mongoChatApp.git
cd mongoCharApp
npm install
```

**Run**

`Start Node Server`

```
node chatServer/server.js
```

`Run the App`

Open new terminal Tab, then:

```
npm start
```

## Folder Structure