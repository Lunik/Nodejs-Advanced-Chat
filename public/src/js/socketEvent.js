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

socket.on('cmd', function(data){
  addServerMessage(data.valRetour);

  switch(data.callback){
    default:
      break;
  }
});