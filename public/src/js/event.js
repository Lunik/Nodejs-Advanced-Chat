
// Keyboard events
$window.keydown(function (event) {

	// Auto focus sur $currentInput
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
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