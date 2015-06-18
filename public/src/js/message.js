var ALTERCOLOR = 0;

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
		var $username = $('<span>').addClass('username').text(user.getUsername());
		$from.append($username);
		var $iconPv = $('<i>').addClass('icon icon-pv');
		$from.append($iconPv);
	} else {
		$.each(user.getRanks(),function(type,rank){
			if(rank > 0){
				//Creation des elements d'icone de rank
				var $icon = $('<i>').addClass('icon');
				$icon.addClass(getIconFromRank(rank));

				//Ajout à la div From
				$from.append($icon);
			}
		});
	}

	//Ajout de l'username à from
	var $username = $('<span>').addClass('username');
	if(message.private)
		$username.text(USERS.usernames[data.toUid].username);
	else 
		$username.text(user.getUsername());

	var classRanks = getClassRank(user.getRanks());
	for(var i=0; i < classRanks.length; i++)
		$username.addClass(classRanks[i])
	$from.append($username).append(':');

	//Ajout de la data à from
	var $time = $('<span>').addClass('timestamp').text(currentHour());

	//Creation de l'element message
	var $msg = $('<div>').addClass('text '+message.id);

	if(user.username == DEFAULSERVERNAME)
		var $msg = $msg.append(message.text);
	else
		var $msg = $msg.text(message.text);
	$msg.append($time);

	//Ajout de la spanModerateur
	if(USER.getRank('moderation') >= 1 && user.username != DEFAULSERVERNAME){
		$moderation = $('<span>').addClass('but-moderation').attr('id',message.id).text("delete");
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



