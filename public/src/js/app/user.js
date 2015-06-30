var DEFAULSERVERNAME;
User = function(){
	this.username = '';
	this.connected = false;
	this.ranks = {
		'moderation':0
	};
	this.badge;
	this.uid;
	this.color = '#FFFFFF';
	this.room = 'default';

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

	this.setColor = function (color){ this.color = color; }
	this.getColor = function (){ return this.color; }
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

function getAllUsernameConnected(){
	var usernames = [];
	for (var uid in USERS.usernames){
		usernames.push(USERS.usernames[uid].username);
	}

	return usernames;
}

function getAllUsernameRoom(room){
	var usernames = [];
	for (var uid in USERS.usernames){
		if(USERS.usernames[uid].room == room)
			usernames.push(USERS.usernames[uid].username);
	}

	return usernames;
}

function getIconFromRank(rank){
	switch(rank){
		case 'rm-moderator':
			return 'icon-moderator';
			break;

		case 'rm-admin':
			return 'icon-admin';
			break;

		case 'rm-server':
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
	user.setColor(data.color);

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
	message = ' '+message+' ';
	if(message.indexOf(' @'+user+' ') != -1)
		return 1;
	return 0;
}

function saveUser(){
	storeData('USER',USER);
}

function getUserDiv(user){
	var $div = $('<div>');
	var $username = $('<span>').addClass('username');

	var classRanks = getClassRank(user.ranks);
	for(var i=0; i < classRanks.length; i++){
		$username.addClass(classRanks[i])
		var $icon = $('<i>').addClass('icon');
		$icon.addClass(getIconFromRank(classRanks[i]));
		$div.append($icon);
	}

	$username.text(user.username);
	$div.append($username);

	return $div;
}
