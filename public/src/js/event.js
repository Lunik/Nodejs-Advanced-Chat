
// Keyboard events
$window.keydown(function (event) {

	// Auto focus sur $currentInput
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
        if($currentInput)
            $currentInput.focus();
    }

    switch (event.which) {
    	//Enter
    	case 13:
    		if (USER.connected) {
    			if($inputMessage.val()[0] == '/'){
    				sendCommand();
    			} else {
    				sendMessage();
    			}
    		} else {
    			setUsername();
    		}
    }
});

//Effacer le message quand on clique sur le bouton delete
$messages.on('click','.but-moderation',function(data){
    var id = data.currentTarget.id;
    COMMANDS.removeMsg(id);
});

//Ajout du pseudo quand on clique dessus
$messages.on('click','.username',function(data){
    console.log(data);
    var username = data.currentTarget.innerHTML;
    addInput($currentInput,' @'+username);
});

//Click sur le boutson de parametre
$chatPage.on('click','.but-param',function(data){
    var pop = new Popup;
    pop.init('center','center','50%','','Parametres',parameterHtml(),false);
    pop.draw();
    $currentInput = null;
});

//Click sur le bouton de smiley
$chatPage.on('click','.but-smiley',function(data){
    if($('.smiley-container').css('display') == 'none')
        $('.smiley-container').show();
    else
        $('.smiley-container').hide();
});

//Click sur le bouton de send message
$chatPage.on('click','.but-send_message',function(data){
    sendMessage();
});

//On new message 
$messages.bind('DOMNodeInserted', function(data){ 
    var className = '.'+data.target.className.split(' ').join('.');
    $newMsg = $(className);
    $message = $(className+' .text');

    $message.html(addMessageEmoji($message.text()));
    $message.html(addImageToMessage($message.html()));
});

emojify.run();


