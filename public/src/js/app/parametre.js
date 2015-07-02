function parameterHtml(){
	$html = $('<div>').addClass('parameterHtml');

	// USERNAME //
	$usernameDiv = $('<div>').addClass('param-username');
	$usernameLabel = $('<label>').text('Pseudo:');
	$usernameSpan = $('<span>').text(USER.getUsername());
	$usernameInput = $('<input>').addClass('param-input change-username').attr('type','submit').attr('value','Change');
	$usernameDiv.append($usernameLabel).append($usernameSpan).append($usernameInput);
	$html.append($usernameDiv);

	// COULEUR D'ECRITURE //
	$colorDiv = $('<div>').addClass('param-color');
	$colorLabel = $('<label>').text('Color:');
	$colorInput = $('<input>').addClass('param-input change-color').attr('type','color').attr('value',USER.getColor());
	$colorDiv.append($colorLabel).append($colorInput);
	$html.append($colorDiv);

	// SOUND //
	$soundDiv = $('<div>').addClass('param-sound');
	$soundLabel = $('<label>').text('Son:');
	$soundInput = $('<input>').addClass('param-input change-sound').attr('type','submit').attr('value',SOUNDS.etat);
	$soundDiv.append($soundLabel).append($soundInput);
	$html.append($soundDiv);

	// SUBMIT //
	$saveDiv = $('<div>').addClass('param-save');
	$submitInput = $('<input>').addClass('param-input save').attr('type','submit').attr('value','Save');
	$saveDiv.append($submitInput);
	$html.append($saveDiv);

	return $html;
}

$('body').on('click','.param-username .change-username',function(){
	USER.setUsername('');
	saveUser();
	location.reload();
});

$('body').on('click','.param-sound .change-sound',function(){
	if(SOUNDS.etat)
		SOUNDS.etat = false;
	else
		SOUNDS.etat = true;

	$('.param-sound .change-sound').attr('value',SOUNDS.etat);
});

$('body').on('click','.param-save',function(){
	var color = $('.param-color input').val();

	USER.setColor(color);

	saveUser();
	storeData('SOUNDS',SOUNDS.etat);
	$currentInput = $inputMessage;
	popupClose();
});

function setParamRoom(room){
	var $rooms = $('.param-room').html(' ');
	var count = countUserInRoom(room);
	var $current = $('<option>').val(room).text(room+' ('+count+')');
	$rooms.append($current);
	var allRooms = getAllRooms();
	allRooms.sort(compareRoom);
	for(var i=0; i<allRooms.length; i++){
		var r = allRooms[i];
		if(r != room){
			count = countUserInRoom(r);
			var $room = $('<option>').val(r).text(r+' ('+count+')');
			$rooms.append($room);
		}
	}
}

function getAllRooms(){
	var rooms = ["Default"];
	for (var uid in USERS.usernames){
		var room = USERS.usernames[uid].room;
		if(rooms.indexOf(room) == -1)
			rooms.push(room);
	}

	return rooms;
}

function countUserInRoom(room){
	var count = 0;
	for (var uid in USERS.usernames){
		var r = USERS.usernames[uid].room;
		if(r == room)
			count++;
	}
	return count;
}

function compareRoom(a, b){
	return countUserInRoom(b) - countUserInRoom(a);
}
//Pour changer de salle avec le menu deroulant
$('.param-room').on('change',function(data){
	COMMANDS.join({room: this.value,priv:false});
});
