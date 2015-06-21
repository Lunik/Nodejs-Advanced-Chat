var ALLEMOJI = [':smiley:',':blush:',':grimacing:',':grin:',':joy:',':grinning:',':smile:',':sweat_smile:',':laughing:',':innocent:',':devil:',':wink:',':confounded:',':neutral_face:',':expressionless:',':unamused:',':angry:',':realy_angry:'];
function getEmojiCode(code){
	code = code.replace(/:/g,'');
	return 'em em-'+code;
}

function addMessageEmoji($div){
	var msg = $div.text().split(' ');
	for(var i=0; i<msg.length; i++){
		if(ALLEMOJI.indexOf(msg[i]) != -1){
			msg[i] = '<i class="'+getEmojiCode(msg[i])+'"></i>';
		}
	}
	msg = msg.join(' ');
	$div.html(msg);
}
