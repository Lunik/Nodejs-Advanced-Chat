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
	var $username = $('<span>').addClass('username').text(user.getUsername());
	$from.append($username);
	//Ajout de la data à from
	var $time = $('<span>').addClass('timestamp').text();

	//Creation de l'element message
	var $msg = $('<div>').addClass('text '+data.message.id).text(message);

	var $el = $('<li>').addClass('msg '+data.message.id);
	$el.append($from).append($msg)

	addMessageElement($el);
}

function addMessageElement(el){
	$('.messages').append(el);
}

function generateMsgId(){
	return 'cid-1';
}
function cleanMessage(message) {
	return message;
}
function sendMessage(){
	var message = cleanMessage($inputMessage.val());
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

function cleaInput(input){
	input.val('');
}