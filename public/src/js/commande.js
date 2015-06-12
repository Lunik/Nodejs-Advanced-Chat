COMMANDS = {
	'list': function (){
		socket.emit('command', {
			'cid': USER.cid,
			'command': {
				'cmd':'list',
				'param': []
			}
		});
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

	//exectution de la commande
	var commandReturn = execCommand(commande);
	//affichages des resultats de la commande
	if(commandReturn.message)
		addServerMessage(commandReturn.message);

}

function execCommand(data){
	var valRetour = {};

	switch(data.cmd){
		case 'list':
				COMMANDS.list();
				valRetour = {
					'etat': 1,
					'message': ''
				};
				break;
		default:
			valRetour = {
				'etat': 0,
				'message': "Command not found"
			};
			break;
	}

	return valRetour;
}