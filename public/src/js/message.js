var ALTERCOLOR = 1;

// Log a message
function log (message) {
	var $el = $('<li>').addClass('log').text(message);
	addMessageElement($el);
}

function addChatMessage (data){
	var user = data.user;
	var message = data.message;

	//Creation de l'element Badge
	var $badge = $('<i>').addClass('bdg');
	$badge.addClass(user.getBadge());
	//Cration du conteneur de badge
	var $bagdeDiv = $('<div>').addClass('badge-box').append($badge);

	//Creation des elements icon de rank
	$from = $('<div>').addClass('from');

	//Si mention dans le message
	if(message.mention){
		var $iconMention = $('<i>').addClass('icon icon-mention');
		$from.append($iconMention);
	}

	//Creation de l'icon de message privé
	if(message.private){
		$from.append(getUserDiv(user));

		var $iconPv = $('<i>').addClass('icon icon-pv');
		$from.append($iconPv);

		$from.append(getUserDiv(USERS.usernames[data.toUid]));
	} else {
		$from.append(getUserDiv(user));
	}

	$from.append(':');

	//Ajout de la data à from
	var $time = $('<span>').addClass('timestamp').text(currentHour());

	//Creation de l'element message
	var $msg = $('<div>').addClass('message '+message.id);

	var $text = $('<span>').addClass('text');
	if(user.username == DEFAULSERVERNAME){
		$text.append(message.text);
	} else {
		$text.text(message.text);
	}
	//Ajout de la couleur
	applyColorOnDiv($text,user.getColor());

	$msg.append($text);
	$msg.append($time);

	//Ajout de la spanModerateur
	if(USER.getRank('moderation') >= 1 && user.username != DEFAULSERVERNAME){
		$moderation = $('<span>').addClass('but but-moderation').attr('id',message.id).text("delete");
		$msg.append($moderation);
	}

	var $el = $('<li>').addClass('msg '+message.id);
	if(message.mention){
		$el.addClass('mention');
	}
	
	$el.append($from).append($msg);

	addMessageElement($el);
}

function addServerMessage(message){
	if(message){
		var serverUser = getUserFromUsername(DEFAULSERVERNAME);
		addChatMessage({
			'user': serverUser,
			'message': {
				'id': generateMsgCid(),
				'text': message
			}
		});
	}
}

function addMessageElement(el){

	if(ALTERCOLOR){
		el.addClass('alter');
		ALTERCOLOR = 0;
	}
	else
		ALTERCOLOR = 1;

	$('.messages').append(el);
	$messages[0].scrollTop = $messages[0].scrollHeight;
}

function generateMsgCid(){
	var date = new Date();
	var cid = date.getDate()+''+date.getMonth()+''+date.getYear()+''+date.getUTCHours()+''+date.getMinutes()+''+date.getSeconds()+''+date.getMilliseconds();
	cid = cid+''+Math.floor(Math.random()*10000);
	return cid;
}

function cleanMessage(message) {
	//suppression des espace de debut
	message = message.trim();
	//on garde que les 150er chars
	message = message.substring(0,150);

	//supprimer toutes les balises html
	var regexHtml = new RegExp("<.[^>]*>", "gi" );
	message = message.replace(regexHtml,'');

	return message;
}

function sendMessage(){
	var message = cleanMessage($inputMessage.val());
	if(message){
		cleaInput($inputMessage);
		var data = {
			'user': USER,
			'message': {
				'id': generateMsgCid(),
				'text': message
			}
		};

		addChatMessage(data);

		socket.emit('send msg', data);
	}
}

function cleaInput(input){
	input.val('');
}

function removeMessage(cid){
	var $deleted = $('<span>').addClass('deleted').text('Deleted');
	$('.msg.'+cid+' .text').html($deleted);
}

function clearChat(){
	$messages.html('');
}

function addInput(input,text){
	input.val(input.val().trim()+text+' ');
}

function applyColorOnDiv(div,color){
	$(div).css('color',color);
}



