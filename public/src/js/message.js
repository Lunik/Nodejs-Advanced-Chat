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
	var serverUser = getUserFromUsername('<server>');
	addChatMessage({
		'user': serverUser,
		'message': {
			'id': generateMsgId(),
			'text': message
		}
	});
}

function addMessageElement(el){
	$('.messages').append(el);
	$messages[0].scrollTop = $messages[0].scrollHeight;
}

function generateMsgId(){
	return 'cid-1';
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
				'id': generateMsgId(),
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