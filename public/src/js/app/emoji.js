var ALLEMOJI = [':smile:',':smiley:',':grinning:',':relaxed:',':wink:',':kissing:',':confounded:',':confused:',':pensive:',':sweat:',':unamused:',':expressionless:',':neutral_face:',':kissing_heart:',':wink:',':worried:',':innocent:',':laughing:',':sweat_smile:',':joy:',':grin:',':flushed:',':sleeping:',':astonished:',':scream:',':sob:',':cold_sweat:',':rage:',':anguished:',':frowning:',':disappointed_relieved:',':triumph:',':persevere:',':cry:',':kissing:',':angry:',':no_mouth:',':dizzy_face:',':stuck_out_tongue_closed_eyes:',':mask:',':stuck_out_tongue_winking_eye:',':weary:',':stuck_out_tongue:',':kissing_closed_eyes:',':smirk:',':sunglasses:',':smiling_imp:',':heart_eyes:',':relieved:',':yum:',':blush:',':grimacing:',':imp:',':alien:',':japanese_goblin:',':cop:',':open_mouth:',':hushed:',':disappointed:',':sleepy:',':tired_face:',':person_with_blond_hair:',':man_with_gua_pi_mao:',':man_with_turban:',':older_man:',':older_woman:',':baby:',':construction_worker:',':princess:',':boy:',':girl:',':man:',':woman:',':scream_cat:',':joy_cat:',':smile_cat:',':heart_eyes_cat:',':smirk_cat:'];

$('.smileys').append(smileyHtml());

function getEmojiCode(code){
	code = code.replace(/:/g,'');
	return 'em em-'+code;
}

function addMessageEmoji(text){
	if(text){
		text = text.split(' ');
		for(var i=0; i<text.length; i++){
			if(ALLEMOJI.indexOf(text[i]) != -1){
				text[i] = '<i class="'+getEmojiCode(text[i])+'"></i>';
			}
		}
		text = text.join(' ');
	}
	return text;
}

function smileyHtml(){
	var $html = $('<div>').addClass('smiley-container');

	//EMOJI
	for(var i=0; i<ALLEMOJI.length; i++){
		var $smiley = $('<i>').addClass(getEmojiCode(ALLEMOJI[i])).addClass('select-smiley but').attr('id',ALLEMOJI[i]);
		$html.append($smiley);
	}

	return $html;
}

//Ajout d'un smiley à la barre de text
$('.smileys').on('click','.select-smiley',function(data){
	var id = data.currentTarget.id;
	$inputMessage.val($inputMessage.val().trim()+' '+id+' ');
});

//Fermer l'onglet smiley si on clique ailleur
$chatPage.click(
	function(data){
		if(data.target.className.indexOf('em') == -1 && data.target.className != 'smiley-container')
			$('.smiley-container').hide();
	}
);
