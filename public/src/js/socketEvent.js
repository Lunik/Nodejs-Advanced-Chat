// Whenever the server emits 'login', log the login message
socket.on('login', function (data) {
  USER.connect();
  USER.setUsername(data.user.username);
  USER.setRanks(data.user.ranks);
  USER.setCid(data.user.cid);
  USERS = data.allUsers;
 
  // Display the welcome message
  var message = "Welcome to Socket.IO Chat";

  log(message);
});

socket.on('user joined', function (data) {
  log(data.username+' joined');
  USERS = data.allUsers;
});

socket.on('user left', function (data) {
  log(data.username+' left');
  USERS = data.allUsers;
});

socket.on('new msg', function(data){
  data.user = getUserFromData(data.user);
  addChatMessage(data);
});

socket.on('user info', function(user){
  USER.ranks = user.ranks;
  USER.username = user.username;
  USER.cid = user.cid;
});

socket.on('cmd', function(data){
  addServerMessage(data.valRetour);

  switch(data.callback){
    case 'login':
        updateMeUserInfo();
        addServerMessage('Logged on');
      break;
    case 'logout':
        updateMeUserInfo();
        addServerMessage('Logged out');
      break;
    default:
      break;
  }
});