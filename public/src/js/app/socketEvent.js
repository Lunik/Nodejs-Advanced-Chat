// Whenever the server emits 'login', log the login message
socket.on('login', function (data) {
  USER.connect();
  USER.setUsername(data.user.username);
  USER.setRanks(data.user.ranks);
  USER.room = data.user.room;
  USER.setUid(data.user.uid);
  USERS = data.allUsers;

  DEFAULSERVERNAME = data.serverName;
  SLOW = data.slow;
  // Display the welcome message
  var message = "Welcome to Socket.IO Chat";

  saveUser();
  log(message);
  setParamRoom(USER.room);
  playSound('login');
});

socket.on('user joined', function (data) {
  log(data.username+' joined');
  USERS = data.allUsers;
  playSound('join');
});

socket.on('user left', function (data) {
  log(data.username+' left');
  USERS = data.allUsers;
  playSound('leave');
});

socket.on('update userlist', function (allUsers) {
  USERS = allUsers;
  setParamRoom(USER.room);
});

socket.on('new msg', function(data){
  data.message.mention = isMention(USER.getUsername(),data.message.text);
  data.user = getUserFromData(data.user);
  addChatMessage(data);
  WAITINGMESSAGES++;
  addNotifWaitingMessage();
  if(data.message.mention){
    playSound('mention');
  } else {
    playSound('newMsg');
  }
});

socket.on('msg', function(data){
  data.user = getUserFromData(data.user);
  addChatMessage(data);
  playSound('mention');
});

socket.on('user info', function(user){
  USER.setRanks(user.ranks);
  USER.setUsername(user.username);
  USER.setUid(user.uid);
  USER.room = user.room

  saveUser();
});

socket.on('cmd', function(data){
  var serverMessage;

  switch(data.callback){
    case 'login':
      updateMeUserInfo();
      serverMessage = 1;
      if(!data.valRetour)
        playSound('error');

    case 'logout':
      updateMeUserInfo();
      serverMessage = 1;
      break;

    case 'kick':
      if(data.valRetour == USER.getUsername()){
        socket.disconnect();
        clearData();
        location.reload();
      }
      serverMessage = 1;
      break;

    case 'ban':
      serverMessage = 1;
      break;

    case 'removeMsg':
      removeMessage(data.valRetour);
      break;

    case 'clean':
      clearChat();
      serverMessage = 1;
      break;

    case 'popup':
      if(data.valRetour !== 1){
        popupClose();
        var pop = new Popup();
        data.valRetour = addMessageEmoji(data.valRetour);
        pop.init('center','center','50%','',"Announce",data.valRetour,true);
        pop.draw();
      }
      serverMessage = 1;
      break;

    case 'join':
      if(data.valRetour && data.valRetour.type == 'join'){
        clearChat();
        USER.room = data.valRetour.room;
        updateMeUserInfo();
        setParamRoom(data.valRetour.room);
        playSound('login');
      }
      if(data.valRetour === 0){
        serverMessage = 1;
        playSound('error');
      } else {
        log(data.message);
      }
      break;
    case 'slow':
      SLOW = data.valRetour;
      serverMessage = 1;
      break;
    default:
      addServerMessage(data.valRetour);
      if(data.valRetour == "Not permitted.")
          playSound('error');
      break;
  }
  if(serverMessage)
    addServerMessage(data.message);
});
