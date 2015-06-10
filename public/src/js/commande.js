COMMANDS = function(){

	this.kick = function (user){
		console.log("kick");
	}
}

function sendCommand(){
	var commandeMsg = cleanMessage($inputMessage.val());
	if(commandeMsg){
		cleaInput($inputMessage);

		commandeMsg = commandeMsg.split(' ');
		console.log(commandeMsg);
		var commande = {
			'cmd': commandeMsg.shift().substring(1),
			'param': commandeMsg
		}
	}

	console.log(commande);
}