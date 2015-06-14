// Whenever the server emits 'login', log the login message
socket.on('login', function (data) {
  USER.connect();
  USER.setUsername(data.user.username);
  USER.setRanks(data.user.ranks);
  USER.setUid(data.user.uid);
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
  USER.setRank(user.ranks);
  USER.setUsername(user.username);
  USER.setUid(user.uid);
});

socket.on('cmd', function(data){

  switch(data.callback){
    case 'login':
      updateMeUserInfo();
      addServerMessage('Logged on');
      break;

    case 'logout':
      updateMeUserInfo();
      addServerMessage('Logged out');
      break;

    case 'list':
      addServerMessage(data.valRetour);
      break;

    case 'kick':
      if(data.valRetour == USER.getUsername()){
        socket.disconnect();
        location.reload();
      }
      break;

    case 'removeMsg':
      removeMessage(data.valRetour);
      break;

    case 'clean':
      clearChat();
      addServerMessage(data.valRetour);
      break;

    default:
      addServerMessage(data.valRetour);
      break;
  }
});