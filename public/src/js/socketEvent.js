// Whenever the server emits 'login', log the login message
socket.on('login', function (data) {
  USER.connect();
  USER.setUsername(data.user.username);
  USER.setRanks(data.user.ranks);
  USER.setUid(data.user.uid);
  USERS = data.allUsers;
  
  DEFAULSERVERNAME = data.serverName;
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
  USER.setRanks(user.ranks);
  USER.setUsername(user.username);
  USER.setUid(user.uid);
});

socket.on('cmd', function(data){

  switch(data.callback){
    case 'login':
      updateMeUserInfo();

    case 'logout':
      updateMeUserInfo();
      break;

    case 'list':

      break;

    case 'kick':
      if(data.valRetour == USER.getUsername()){
        socket.disconnect();
        location.reload();
      }
      break;

    case 'ban':
      
      break;

    case 'removeMsg':
      removeMessage(data.valRetour);
      break;

    case 'clean':
      clearChat();
      break;

    case 'popup':
      if(data.valRetour !== 1){
        popupClose();
        var pop = new Popup();
        pop.init('center','center','50%','50%',"Announce",data.valRetour);
        pop.draw();
      }
      break;

    default:
      addServerMessage(data.valRetour);
      break;
  }

  addServerMessage(data.message);
});