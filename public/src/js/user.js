var DEFAULSERVERNAME;
User = function(){
	this.username = '';
	this.connected = false;
	this.ranks = {
		'moderation':0
	};
	this.badge;
	this.uid;

	this.connect = function (){ this.connected = true; }
	this.disconnect = function (){ this.connected = false; }

	this.setUsername = function (username){ this.username = username; }
	this.getUsername = function (){ return this.username; }

	this.setRank = function (type,rank){ 
		this.ranks[type] = rank; 
	}
	this.setRanks = function (ranks){ 
		this.ranks = ranks; 
	}
	this.getRank = function (type){ return this.ranks[type]; }
	this.getRanks = function (){ return this.ranks; }

	this.setBadge = function (badge){ this.badge = badge; }
	this.getBadge = function (){ return this.badge; }

	this.setUid = function (uid){ this.uid = uid; }
	this.getUid = function (){ return this.uid; }
}

initUser();

function initUser(){
	USER = new User();
}

// Sets the client's username
function setUsername () {
	var username = $usernameInput.val().trim();
	if(username.length >=3) {
		 $loginPage.fadeOut();
		 $chatPage.show();
		 $loginPage.off('click');
		 $currentInput = $inputMessage.focus();

		 socket.emit('add user', username);
	}
}

function getIconFromRank(rank){
	switch(rank){
		case 1:
			return 'icon-moderator';
			break;

		case 2:
			return 'icon-admin';
			break;

		case 1000:
			return 'icon-server';
			break;
			
		default:
			return 'icon-default';
			break;
	}
}

function getUserFromData(data){
	var user = new User();
	user.setUsername(data.username);
	user.setRanks(data.ranks);

	return user;
}

function getUserFromUsername(username){
	var user = new User();
	user.setUsername(username);
	user.connected
	if(username == DEFAULSERVERNAME)
		user.setRank('moderation',1000);

	return user;
}

function updateMeUserInfo(){
	socket.emit('user info', USER.getUid());
}

function getUidFromUsername(username){
	for(var uid in USERS.usernames){
		if(username == USERS.usernames[uid].username){
			return uid;
		}
	}
	return null;
}

function getClassRank(ranks){
	var returnClass = [];
	switch(ranks.moderation){
		case 1:
			//moderator classRank
			returnClass.push('rm-moderator');
			
			break;

		case 2:
			//admin classRank
			returnClass.push('rm-admin');
			break;

		case 1000:
			//admin classRank
			returnClass.push('rm-server');
			break;

		default:
			//default classRank
			returnClass.push('rm-default');
			break;
	}

	return returnClass;
}

function isMention(user,message){
	message = message+' ';
	if(message.indexOf(' @'+user+' ') != -1)
		return 1;
	return 0;
}






