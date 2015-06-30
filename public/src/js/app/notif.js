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

//Enleve les notifs
$('body').click(function(){
	initTitle();
	WAITINGMESSAGES = 0;
});
