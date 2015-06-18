function parameterHtml(){
	$html = $('<div>');

	// USERNAME //
	$usernameDiv = $('<div>').addClass('param-username');
	$usernameLabel = $('<label>').text('Pseudo:');
	$usernameSpan = $('<span>').text(USER.getUsername());
	$usernameInput = $('<input>').addClass('change-username').attr('type','submit').attr('value','Change');
	$usernameDiv.append($usernameLabel).append($usernameSpan).append($usernameInput);
	$html.append($usernameDiv);

	// COULEUR D'ECRITURE //
	$colorDiv = $('<div>').addClass('param-color');
	$colorLabel = $('<label>').text('Color:');
	$colorInput = $('<input>').attr('type','text').attr('value',USER.getColor());
	$colorDiv.append($colorLabel).append($colorInput);
	$html.append($colorDiv);

	// SUBMIT //
	$submitInput = $('<input>').addClass('param-save').attr('type','submit').attr('value','Save');
	$html.append($submitInput);

	return $html;
}

$('body').on('click','.param-username .change-username',function(){
	USER.setUsername('');
	saveUser();
	location.reload();
});

$('body').on('click','.param-save',function(){
	var color = $('.param-color input').val();

	USER.setColor(color);

	saveUser();
	$currentInput = $inputMessage;
	popupClose();
});