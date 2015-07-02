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

function invitationHtml(by,room,pass){
	$html = $('<div>').addClass('invitationHtml');

	$html.append(
		$('<div>').addClass('invitation-speech').text(by+' invite you to join '+room+'.')
	).append(
		$('<input>').addClass('pnotif-but pnotif-decline decline-invitation').attr('type','submit').attr('value','Decline')
	).append(
		$('<input>').addClass('pnotif-but pnotif-accept accept-invitation').attr('type','submit').attr('value','Accept').attr('id',room+' '+pass)
	);

	return $html;
}

$('body').on('click','.decline-invitation',function(){
	pnotifClose();
});

$('body').on('click','.accept-invitation',function(data){
	var id = data.target.id.split(' ');
	var room = id.shift();
	var pass = id.shift();
	COMMANDS.join({room: room,pass: pass});
	pnotifClose();
});
