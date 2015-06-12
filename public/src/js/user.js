User = function(){
	this.username = '';
	this.connected = false;
	this.ranks = {
		'moderation':0
	};
	this.badge;
	this.cid;

	this.connect = function (){ this.connected = true; }
	this.disconnect = function (){ this.connected = false; }

	this.setUsername = function (username){ this.username = username; }
	this.getUsername = function (){ return this.username; }

	this.setRanks = function (rank,type){ 
		this.ranks.type = rank; 
	}
	this.getRank = function (type){ return this.ranks.type; }
	this.getRanks = function (){ return this.ranks; }

	this.setBadge = function (badge){ this.badge = badge; }
	this.getBadge = function (){ return this.badge; }

	this.setCid = function (cid){ this.cid = cid; }
	this.getCid = function (){ return this.cid; }
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
	return 'icon-default';
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

	return user;
}

function getAllUsernameConnected(){
	var usernames = [];
	$.each(USERS.usernames,function(index,data){
		usernames.push(data);
	});

	return usernames;
}




