// Log a message
function log (message) {
	var $el = $('<li>').addClass('log').text(message);
	addMessageElement($el);
}

function addChatMessage (data){
	var user = data.user;
	var message = data.message.text;

	//Creation de l'element Badge
	var $badge = $('<i>').addClass('bdg');
	$badge.addClass(user.getBadge());
	//Cration du conteneur de badge
	var $bagdeDiv = $('<div>').addClass('badge-box').append($badge);

	//Creation des elements icon de rank
	$from = $('<div>').addClass('from');
	$.each(user.getRanks(),function(type,rank){
		//Creation des elements d'icone de rank
		var $icon = $('<i>').addClass('icon');
		$icon.addClass(getIconFromRank(rank));

		//Ajout à la div From
		$from.append($icon);
	});
	//Ajout de l'username à from
	var $username = $('<span>').addClass('username').text(user.getUsername()+':');
	$from.append($username);
	//Ajout de la data à from
	var $time = $('<span>').addClass('timestamp').text(currentHour());

	//Creation de l'element message
	var $msg = $('<div>').addClass('text '+data.message.id).text(message).append($time);

	var $el = $('<li>').addClass('msg '+data.message.id);
	$el.append($from).append($msg)

	addMessageElement($el);
}

function addServerMessage(message){
	if(message){
		var serverUser = getUserFromUsername('<server>');
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

