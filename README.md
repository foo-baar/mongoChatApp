
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

![Alt text](https://user-images.githubusercontent.com/13655874/31836824-355fc3b4-b5f4-11e7-9312-0ae5779949d7.png)


`Run the App`

Open new terminal Tab, then:

```
npm start
```

## Screens

**Login**
![Alt text](https://user-images.githubusercontent.com/13655874/31836871-6704bf32-b5f4-11e7-8bfa-8e30ff882bb3.png)

**General Room**
![Alt text](https://user-images.githubusercontent.com/13655874/31836909-89931a76-b5f4-11e7-8efa-4f8934613071.png)

**Private Message**
![Alt text](https://user-images.githubusercontent.com/13655874/31837030-e601f82c-b5f4-11e7-93ec-7488cb71f0d0.png)