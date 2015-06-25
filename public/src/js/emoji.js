var ALLEMOJI = [':smile:',':smiley:',':grinning:',':relaxed:',':wink:',':kissing:',':confounded:',':confused:',':pensive:',':sweat:',':unamused:',':expressionless:',':neutral_face:',':kissing_heart:',':wink:',':worried:',':innocent:',':laughing:',':sweat_smile:',':joy:',':grin:',':flushed:',':sleeping:',':astonished:',':scream:',':sob:',':cold_sweat:',':rage:',':anguished:',':frowning:',':disappointed_relieved:',':triumph:',':persevere:',':cry:',':kissing:',':angry:',':no_mouth:',':dizzy_face:',':stuck_out_tongue_closed_eyes:',':mask:',':stuck_out_tongue_winking_eye:',':weary:',':stuck_out_tongue:',':kissing_closed_eyes:',':smirk:',':sunglasses:',':smiling_imp:',':heart_eyes:',':relieved:',':yum:',':blush:',':grimacing:',':imp:',':alien:',':japanese_goblin:',':cop:',':open_mouth:',':hushed:',':disappointed:',':sleepy:',':tired_face:',':person_with_blond_hair:',':man_with_gua_pi_mao:',':man_with_turban:',':older_man:',':older_woman:',':baby:',':construction_worker:',':princess:',':boy:',':girl:',':man:',':woman:',':scream_cat:',':joy_cat:',':smile_cat:',':heart_eyes_cat:',':smirk_cat:'];
function getEmojiCode(code){
	code = code.replace(/:/g,'');
	return 'em em-'+code;
}

function addMessageEmoji(text){
	var msg = text.split(' ');
	for(var i=0; i<msg.length; i++){
		if(ALLEMOJI.indexOf(msg[i]) != -1){
			msg[i] = '<i class="'+getEmojiCode(msg[i])+'"></i>';
		}
	}
	msg = msg.join(' ');
	return msg;
}

function smileyHtml(){
	var $html = $('<div>');

	//EMOJI
	for(var i=0; i<ALLEMOJI.length; i++){
		var $smiley = $('<i>').addClass(getEmojiCode(ALLEMOJI[i])).addClass('select-smiley but').attr('id',ALLEMOJI[i]);
		$html.append($smiley);
	}

	return $html;
}

$('body').on('click','.select-smiley',function(data){
	var id = data.currentTarget.id;
	$inputMessage.val($inputMessage.val()+' '+id+' ');
});