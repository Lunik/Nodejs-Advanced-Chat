$title = {
	'jq': $('title'),
	'default': 'Lunik Chat'
}

function addNotifWaitingMessage(){
	$title.jq.text($title.default+' ('+WAITINGMESSAGES+')');
}

function initTitle(){
	$title.jq.text($title.default);
}

function setNotifRoom(room){
	$('.room .room-id').text(room);
}

//Enleve les notifs
$('body').click(function(){
	initTitle();
	WAITINGMESSAGES = 0;
});
