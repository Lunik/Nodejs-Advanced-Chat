
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
    pop.init('center','center','50%','','Parametres',parameterHtml());
    pop.draw();
    $currentInput = null;
});

//On new message 
$messages.bind('DOMNodeInserted', function(data){ 
    var className = '.'+data.target.className.split(' ').join('.');
    $newMsg = $(className);
    $message = $(className+' .text');

    addMessageEmoji($message);
});

emojify.run();


