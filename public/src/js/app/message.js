var ALTERCOLOR = 1;
var WAITINGMESSAGES = 0;

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
	var $msg = $('<div>').addClass('message '+message.id).attr('id',message.id);

	var $text = $('<span>').addClass('text');
	if(user.username == DEFAULSERVERNAME){
		$text.html(message.text);
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

	var $el = $('<li>').addClass('msg '+message.id).attr('id',message.id);
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
	return 'cid-'+cid;
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

function ValidUrl(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}

function getUrls(text){
	var mots = text.split(' ');
	var urls = [];

	for(var i=0; i<mots.length; i++){
		if(ValidUrl(mots[i]) && urls.indexOf(mots[i]) == -1)
			urls.push(mots[i]);
	}
	return urls;
}

function addIdToUrls(message,messageId){
	//exclusion des logs
	if(message){
		var urls = getUrls(message);
		for(var i=0; i<urls.length; i++){
			message = message.replace(urls[i],'<a class="'+messageId+i+'" href="'+urls[i]+'">'+urls[i]+'</a>');
		}
	}
	return message;
}

function addImageToUrls(messageCid){
	var i=0;
	while ($('.'+messageCid+i).length) {
		var img = new Image();
		img.src = $('.'+messageCid+i).attr('href');
		img.id = messageCid+i;
		img.onload = function(){
			$('.'+this.id).html(this);
			$messages[0].scrollTop = $messages[0].scrollHeight;
		}
		i++;
	}
}
