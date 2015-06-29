initUserData();

function storeData(key,data){
	data = JSON.stringify(data);
	localStorage.setItem(key,data);
}

function readData(key){
	var data = localStorage.getItem(key);
	data = JSON.parse(data);
	return data;
}

function clearData(){
	localStorage.clear();
}

function clearKey(key){
	localStorage.setItem(key,null);
}

function initUserData(){
	var rUser = readData('USER');
	if(rUser){
		if(rUser.username.length >=3) {
			 $loginPage.fadeOut();
			 $chatPage.show();
			 $loginPage.off('click');
			 $currentInput = $inputMessage.focus();

			 socket.emit('add user', rUser.username);
		}

		USER.setBadge(rUser.badge);
		USER.setColor(rUser.color);
	}
}
